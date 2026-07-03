// Pages Function: GitHub OAuth for Decap CMS
export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)
  const path = url.pathname

  // --- /api/oauth/auth: redirect to GitHub ---
  if (path.endsWith('/auth')) {
    const provider = url.searchParams.get('provider') || 'github'
    const scope = url.searchParams.get('scope') || 'repo'
    const redirectUri = url.origin + '/api/oauth/callback'
    const state = crypto.randomUUID()

    const githubUrl =
      'https://github.com/login/oauth/authorize?client_id=' +
      encodeURIComponent(env.GITHUB_CLIENT_ID) +
      '&redirect_uri=' + encodeURIComponent(redirectUri) +
      '&scope=' + encodeURIComponent(scope + ' user') +
      '&state=' + encodeURIComponent(state)

    // Return HTML with JS redirect to preserve window.opener
    const html =
      '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Redirecting to GitHub...</title></head><body>' +
      '<script>window.location.replace(' + JSON.stringify(githubUrl) + ');</script></body></html>'

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': 'oauth_state=' + state + '; Path=/; HttpOnly; SameSite=Lax; Max-Age=300; Secure',
      },
    })
  }

  // --- /api/oauth/callback: exchange code for token, redirect to static handshake page ---
  if (path.endsWith('/callback')) {
    const code = url.searchParams.get('code')
    if (!code) {
      return new Response('Missing code', { status: 400 })
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
    if (tokenData.error || !tokenData.access_token) {
      return new Response('OAuth error: ' + JSON.stringify(tokenData), { status: 400 })
    }

    const token = tokenData.access_token
    const redirectUrl = url.origin + '/admin/auth-callback.html#access_token=' +
      encodeURIComponent(token) + '&provider=github'

    // 302 redirect — no inline JS needed. The static auth-callback.html
    // reads the token from the hash and does the postMessage handshake.
    return Response.redirect(redirectUrl, 302)
  }

  return new Response('Not found. Try /auth or /callback', { status: 404 })
}
