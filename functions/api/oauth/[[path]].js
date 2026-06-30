// Pages Function: GitHub OAuth for Decap CMS
export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)
  const path = url.pathname

  // Debug
  if (path.endsWith('/debug')) {
    return new Response(
      'GITHUB_CLIENT_ID=' + (env.GITHUB_CLIENT_ID || 'NOT SET') + '\n' +
      'GITHUB_CLIENT_SECRET=' + (env.GITHUB_CLIENT_SECRET ? 'SET (len=' + env.GITHUB_CLIENT_SECRET.length + ')' : 'NOT SET') + '\n' +
      'origin=' + url.origin + '\n' +
      'path=' + path,
      { headers: { 'content-type': 'text/plain' } }
    )
  }

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

    if (!code) {
      return new Response('Missing code', { status: 400 })
    }

    // Exchange code for access token
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

    // Return HTML that posts the token to Decap CMS via postMessage and closes the window
    const accessToken = tokenData.access_token
    const html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Redirecting...</title></head><body><script>(function(){var token=' + JSON.stringify(accessToken) + ';window.opener.postMessage({token:token},"*");window.close()})();</script></body></html>'

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  return new Response('Not found. Try /auth, /callback, or /debug', { status: 404 })
}
