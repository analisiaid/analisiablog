// Pages Function: GitHub OAuth for Decap CMS
export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)
  const path = url.pathname

  // --- /api/oauth/auth: redirect to GitHub ---
  if (path.endsWith('/auth')) {
    // Read provider & scope from Decap CMS query params
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

  // --- /api/oauth/callback: exchange code for token, then handshake via postMessage ---
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

    // Decap CMS NetlifyAuthenticator expects a two-way postMessage handshake:
    //   1. Popup posts "authorizing:github"  →  opener
    //   2. Opener replies "authorizing:github"  →  popup
    //   3. Popup posts "authorization:github:success:{json}"  →  opener
    //
    // If window.opener is null (same-window / no popup), fall back to localStorage + redirect.
    const provider = 'github'
    const successPayload = JSON.stringify({ token, provider })

    const html =
      '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Logged in!</title></head><body>' +
      '<p id="msg">Completing login...</p>' +
      '<script>' +
      '(function(){' +
      'var token = ' + JSON.stringify(token) + ';' +
      'var provider = ' + JSON.stringify(provider) + ';' +
      'var payload = ' + JSON.stringify(successPayload) + ';' +
      'var opener = window.opener;' +
      'if (opener) {' +
      '  var msg = document.getElementById("msg");' +
      '  // Step 1: tell main window we are authorizing' +
      '  opener.postMessage("authorizing:" + provider, "*");' +
      '  msg.textContent = "Handshaking...";' +
      '  // Step 2: wait for main window to acknowledge' +
      '  var onMessage = function(e) {' +
      '    if (e.data === "authorizing:" + provider) {' +
      '      window.removeEventListener("message", onMessage, false);' +
      '      msg.textContent = "Authorized!";' +
      '      // Step 3: send the token' +
      '      opener.postMessage("authorization:" + provider + ":success:" + payload, "*");' +
      '      window.close();' +
      '    }' +
      '  };' +
      '  window.addEventListener("message", onMessage, false);' +
      '  // Timeout: close popup if handshake fails' +
      '  setTimeout(function() { window.close(); }, 15000);' +
      '} else {' +
      '  // No popup opener — tell user to allow popups and try again' +
      '  document.getElementById("msg").textContent = "Login complete! But the popup window was blocked by your browser. Please allow popups for this site, then go back and click Login with GitHub again.";' +
      '}' +
      '})();' +
      '</script></body></html>'

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  return new Response('Not found. Try /auth or /callback', { status: 404 })
}
