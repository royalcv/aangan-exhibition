const CONTACT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxU3cGFO4WXd_iGQsHnshROMqxp0RmigNlAtRARR5x1jG2aujo7qDkIOhtXBLYisYPJ/exec';

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

/**
 * Submits the Contact page form to the Apps Script web app bound to the
 * "Aangan Contact Submissions" Google Sheet. Sent in `no-cors` mode since the
 * endpoint doesn't return browser-readable CORS headers for this request shape —
 * the response is opaque, so a resolved fetch (no thrown network error) is
 * treated as success.
 */
export async function submitToGoogleForm(data: ContactFormData): Promise<void> {
  const payload = new URLSearchParams({
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
  });

  await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: payload,
  });
}
