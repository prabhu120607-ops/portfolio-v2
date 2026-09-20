export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.RESEND_FROM_EMAIL) {
    return response.status(500).json({ error: 'Email service is not configured.' });
  }

  const { name, email, subject, message } = request.body || {};
  if (!name || !email || !subject || !message) {
    return response.status(400).json({ error: 'Please complete all required fields.' });
  }

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    })
  });

  if (!emailResponse.ok) {
    return response.status(502).json({ error: 'The email service could not send your message.' });
  }

  return response.status(200).json({ success: true });
}