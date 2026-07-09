/// <reference types="@cloudflare/workers-types" />

// Pages Function: POST /api/subscribe
// Validates input, adds contact to Resend audience, sends welcome email

const RESEND_API_KEY='YOUR_R..._KEY'

// Extract a URL-safe slug from the subscription page URL.
// Returns null for homepage, /subscribe/, or missing URL.
function extractSlug(url) {
  if (!url) return null
  try {
    const path = new URL(url).pathname.replace(/\/+$/, '') // strip trailing slash
    if (!path || path === '' || path === '/subscribe') return null
    const slug = path.split('/').filter(Boolean).pop()
    return slug && /^[a-z0-9][a-z0-9-]*$/.test(slug) ? slug : null
  } catch {
    return null
  }
}

export async function onRequest(context) {
  const request = context.request
  const env = context.env

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const formData = await request.json()
  const { email, name, turnstileToken, url } = formData

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Verify Turnstile
  if (turnstileToken && env.TURNSTILE_SECRET) {
    const turnstileResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET,
        response: turnstileToken,
      }),
    })
    const turnstileResult = await turnstileResp.json()
    if (!turnstileResult.success) {
      return new Response(JSON.stringify({ error: 'Bot detected' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  // Add contact to Resend audience
  const apiKey = env.RESEND_API_KEY || RESEND_API_KEY
  const AUDIENCE_ID = '8642485b-ad7c-498d-a00d-10db8dbbf100'

  const createContactRes = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      first_name: name || '',
      unsubscribed: false,
    }),
  })

  let contactId = null
  if (createContactRes.ok) {
    const contactData = await createContactRes.json()
    contactId = contactData.id
  } else {
    const err = await createContactRes.text()
    console.error('Resend create contact error:', err)
  }

  // Send custom event to trigger Resend automations (welcome flow, etc.)
  await fetch('https://api.resend.com/events/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: 'subscriber.joined',
      email: email,
      payload: {
        name: name || '',
        url: url || '',
      },
    }),
  })

  // Send per-post event for post-specific Resend automations
  // e.g. subscriber.joined.ga4-audit-tool
  const slug = extractSlug(url)
  if (slug) {
    await new Promise(r => setTimeout(r, 600))
    await fetch('https://api.resend.com/events/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: `subscriber.joined.${slug}`,
        email: email,
        payload: {
          name: name || '',
        },
      }),
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
