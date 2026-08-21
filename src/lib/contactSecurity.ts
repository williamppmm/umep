const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
};

const DEFAULT_BLOB_HOSTNAME = 'sykw99bi95mzbciw.public.blob.vercel-storage.com';
const BLOB_ALLOWED_HOSTNAME = (
  process.env.BLOB_ALLOWED_HOSTNAME ?? DEFAULT_BLOB_HOSTNAME
).trim().toLowerCase();

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => HTML_ENTITIES[character]);
}

export function sanitizeEmailHeader(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

export function getAllowedBlobUrl(value: string) {
  try {
    const url = new URL(value);

    if (
      url.protocol !== 'https:' ||
      url.hostname.toLowerCase() !== BLOB_ALLOWED_HOSTNAME ||
      !url.pathname.startsWith('/leads/') ||
      url.username ||
      url.password ||
      url.port ||
      url.hash
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}
