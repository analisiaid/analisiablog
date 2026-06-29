// GitHub OAuth Worker — for Decap CMS login on Cloudflare Pages
// Deploy from workers/ directory: npx wrangler deploy github-oauth-worker.js --name analisia-blog-oauth

async function handleRequest(request, env) {
  const url = new URL(request.url)
  const path = url.pathname

  if (path === '/api/oauth/auth') {
    const redirectUri = url.origin + '/api/oauth/callback'
    const state = crypto.randomUUID()
    
    await env.ANALISIA_OAUTH.put(state, 'pending', { expirationTtl: 300 })

    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize')
    githubAuthUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID)
    githubAuthUrl.searchParams.set('redirect_uri', redirectUri)
    githubAuthUrl.searchParams.set('scope', 'repo user')
    githubAuthUrl.searchParams.set('state', state)

    return Response.redirect(githubAuthUrl.toString(), 302)
  }

  if (path === '/api/oauth/callback') {
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const storedState = await env.ANALISIA_OAUTH.get(state)

    if (!code || !state || !storedState) {
      return new Response('Invalid OAuth response', { status: 400 })
    }

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return new Response(`OAuth error: ${tokenData.error_description || tokenData.error}`, { status: 400 })
    }

    // Return a page that passes the token to Decap CMS via postMessage
    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Redirecting...</title></head>
<body>
<script>
  (function() {
    var token = ${JSON.stringify(tokenData.access_token)};
    var authResult = { token: token };
    window.opener.postMessage(authResult, '*');
    window.close();
  })();
</script>
</body>
</html>`

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  return new Response('Not found', { status: 404 })
}

export default {
  fetch: handleRequest,
}
