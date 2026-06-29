/// <reference types="@cloudflare/workers-types" />

// Pages Function: POST /api/subscribe
// Validates input, adds contact to Resend audience, sends welcome email

const RESEND_API_KEY = 'YOUR_RESEND_API_KEY'
const RESEND_AUDIENCE_ID = 'YOUR_RESEND_AUDIENCE_ID'
const RESEND_WELCOME_TEMPLATE = 'welcome'

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
  const { email, name, turnstileToken } = formData

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
  const audienceId = env.RESEND_AUDIENCE_ID || RESEND_AUDIENCE_ID

  const createContactRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
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

  if (!createContactRes.ok) {
    const err = await createContactRes.text()
    console.error('Resend create contact error:', err)
  }

  // Send welcome email
  const welcomeTemplate = env.RESEND_WELCOME_TEMPLATE || RESEND_WELCOME_TEMPLATE
  const sendEmailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Analisia Blog <newsletter@blog.analisia.id>',
      to: [email],
      template_id: welcomeTemplate,
    }),
  })

  if (!sendEmailRes.ok) {
    const err = await sendEmailRes.text()
    console.error('Resend send email error:', err)
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
