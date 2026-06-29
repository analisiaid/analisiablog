// Pages Function: GitHub OAuth for Decap CMS
export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)
  const path = url.pathname

  // --- /api/oauth/auth: redirect to GitHub ---
  if (path.endsWith('/auth')) {
    const redirectUri = url.origin + '/api/oauth/callback'
    const state = crypto.randomUUID()

    const githubUrl = 'https://github.com/login/oauth/authorize?' +
      'client_id=' + encodeURIComponent(env.GITHUB_CLIENT_ID) +
      '&redirect_uri=' + encodeURIComponent(redirectUri) +
      '&scope=' + encodeURIComponent('repo user') +
      '&state=' + encodeURIComponent(state)

    return new Response(null, {
      status: 302,
      headers: {
        'Location': githubUrl,
        'Set-Cookie': 'oauth_state=' + state + '; Path=/; HttpOnly; SameSite=Lax; Max-Age=300; Secure',
      },
    })
  }

  // --- /api/oauth/callback: exchange code for token ---
  if (path.endsWith('/callback')) {
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const cookies = {}
    const cookieStr = request.headers.get('Cookie') || ''
    cookieStr.split(';').forEach(function(c) {
      const eq = c.indexOf('=')
      if (eq !== -1) cookies[c.substring(0, eq).trim()] = c.substring(eq + 1).trim()
    })

    if (!code || !state || cookies.oauth_state !== state) {
      return new Response('Invalid request', { status: 400 })
    }

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
    })

    const tokenData = await tokenRes.json()
    if (tokenData.error) {
      return new Response('OAuth error: ' + (tokenData.error_description || tokenData.error),
        { status: 400 })
    }

    const accessToken = tokenData.access_token
    const html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Redirecting...</title></head><body><script>(function(){var token=' + JSON.stringify(accessToken) + ';window.opener.postMessage({token:token},"*");window.close()})();</script></body></html>'

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': 'oauth_state=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure',
      },
    })
  }

  return new Response('Not found', { status: 404 })
}
