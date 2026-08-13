/**
 * AWS Lambda function to handle contact form submissions via SES
 * This function is deployed to Lambda and exposed via API Gateway
 */

const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

// Initialize SES client
// AWS_REGION is automatically set by Lambda runtime
const sesClient = new SESClient({
  region: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1'
});

const FROM_EMAIL = process.env.SES_FROM_EMAIL;
const TO_EMAIL = process.env.SES_TO_EMAIL || process.env.SES_FROM_EMAIL;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
const SITE_NAME = process.env.SITE_NAME || 'the website';

// Bounded so a single submission cannot generate an oversized SES payload
const FIELD_LIMITS = {
  fullName: 100,
  email: 254,
  company: 200,
  budget: 50,
  message: 5000
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const HTML_ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => HTML_ENTITIES[char]);

// Newlines in a subject line are a header-injection vector
const singleLine = (value) => String(value).replace(/[\r\n]+/g, ' ').trim();

const buildResponse = (statusCode, payload) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    ...(ALLOWED_ORIGIN
      ? {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          Vary: 'Origin'
        }
      : {})
  },
  body: JSON.stringify(payload)
});

/**
 * Returns a trimmed value, or null when the field is absent, the wrong type,
 * or longer than its limit. Callers decide whether null is acceptable.
 */
const readField = (body, name) => {
  const raw = body[name];
  if (raw === undefined || raw === null) return null;
  if (typeof raw !== 'string') return null;

  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > FIELD_LIMITS[name]) return null;

  return trimmed;
};

exports.handler = async (event) => {
  // Payload format 2.0 nests the method; fall back to 1.0 for compatibility
  const method = event?.requestContext?.http?.method || event?.httpMethod;

  if (method === 'OPTIONS') {
    return buildResponse(200, {});
  }

  if (method && method !== 'POST') {
    return buildResponse(405, { error: 'Method not allowed' });
  }

  if (!FROM_EMAIL || !TO_EMAIL) {
    console.error('SES_FROM_EMAIL / SES_TO_EMAIL are not configured');
    return buildResponse(500, { error: 'Contact form is not configured' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (error) {
    return buildResponse(400, { error: 'Request body must be valid JSON' });
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return buildResponse(400, { error: 'Request body must be a JSON object' });
  }

  const fullName = readField(body, 'fullName');
  const email = readField(body, 'email');
  const message = readField(body, 'message');
  const company = readField(body, 'company');
  const budget = readField(body, 'budget');

  if (!fullName || !email || !message) {
    return buildResponse(400, {
      error: 'Name, email, and message are required and must be within the allowed length'
    });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return buildResponse(400, { error: 'Please provide a valid email address' });
  }

  const companyText = company || 'Not provided';
  const budgetText = budget || 'Not provided';

  const emailBody = `
New contact form submission:

Name: ${fullName}
Email: ${email}
Company: ${companyText}
Budget: ${budgetText}

Message:
${message}

---
This email was sent from the ${SITE_NAME} contact form.
  `.trim();

  // Every interpolation below is attacker-controlled and must stay escaped
  const safe = {
    fullName: escapeHtml(fullName),
    email: escapeHtml(email),
    company: escapeHtml(companyText),
    budget: escapeHtml(budgetText),
    message: escapeHtml(message),
    siteName: escapeHtml(SITE_NAME)
  };

  const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #b30000;">New Contact Form Submission</h2>
        <table style="width: 100%; max-width: 600px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 10px;">${safe.fullName}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold;">Email:</td>
            <td style="padding: 10px;">${safe.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Company:</td>
            <td style="padding: 10px;">${safe.company}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold;">Budget:</td>
            <td style="padding: 10px;">${safe.budget}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #b30000;">
          <h3 style="margin-top: 0; color: #b30000;">Message:</h3>
          <p style="white-space: pre-wrap;">${safe.message}</p>
        </div>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 12px; color: #666;">This email was sent from the ${safe.siteName} contact form.</p>
      </body>
    </html>
  `;

  try {
    await sesClient.send(
      new SendEmailCommand({
        Source: FROM_EMAIL,
        Destination: {
          ToAddresses: [TO_EMAIL]
        },
        ReplyToAddresses: [email],
        Message: {
          Subject: {
            Data: singleLine(`New Contact Form Submission from ${fullName}`),
            Charset: 'UTF-8'
          },
          Body: {
            Text: {
              Data: emailBody,
              Charset: 'UTF-8'
            },
            Html: {
              Data: htmlBody,
              Charset: 'UTF-8'
            }
          }
        }
      })
    );

    return buildResponse(200, {
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    // Logged for CloudWatch, never returned: SES errors leak account detail
    console.error('Error sending email:', error);
    return buildResponse(500, { error: 'Failed to send email' });
  }
};
