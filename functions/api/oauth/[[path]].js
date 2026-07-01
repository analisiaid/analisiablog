// Pages Function: GitHub OAuth for Decap CMS
export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)
  const path = url.pathname

  // --- /api/oauth/auth: redirect to GitHub ---
  if (path.endsWith('/auth')) {
    const redirectUri = url.origin + '/api/oauth/callback'
    const state = crypto.randomUUID()

    const githubUrl =
      'https://github.com/login/oauth/authorize?client_id=' +
      encodeURIComponent(env.GITHUB_CLIENT_ID) +
      '&redirect_uri=' + encodeURIComponent(redirectUri) +
      '&scope=' + encodeURIComponent('repo user') +
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

  // --- /api/oauth/callback: exchange code for token ---
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

    // HTML that tries postMessage first, falls back to localStorage, then redirects to admin
    const html =
      '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Logged in!</title></head><body>' +
      '<p id="msg">Completing login...</p>' +
      '<script>' +
      '(function(){' +
      'var token = ' + JSON.stringify(token) + ';' +
      'var opener = window.opener;' +
      'if (opener) {' +
      '  opener.postMessage({token: token}, "*");' +
      '  window.close();' +
      '} else {' +
      '  try { localStorage.setItem("decap_cms_token", token); } catch(e) {}' +
      '  document.getElementById("msg").textContent = "Login complete. Close this window and refresh the admin page.";' +
      '}' +
      '})();' +
      '</script></body></html>'

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  return new Response('Not found. Try /auth or /callback', { status: 404 })
}
