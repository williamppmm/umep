export const siteConfig = {
  name: 'UMEP',
  legalName: 'UMEP - Unidad de Mantenimiento Electronico Profesional',
  url: 'https://umepcali.com',
  baseUrl: 'https://umepcali.com',
  locale: 'es_CO',
  title: 'UMEP - Mantenimiento y Reparacion Industrial | Valle del Cauca',
  description:
    'Mantenimiento y reparacion profesional de equipos industriales: variadores, PLCs, HMIs, balanzas y mas. Servicio tecnico en Cali y Valle del Cauca.',
  ogImage: '/media/og-default.jpg',
};

export const contactInfo = {
  whatsappE164: '573003212328',
  whatsappDisplay: '300 321 2328',
  whatsappInternational: '+57 300 321 2328',
  email: 'contacto@umepcali.com',
  city: 'Cali',
  region: 'Valle del Cauca',
  country: 'Colombia',
  countryCode: 'CO',
};

export const socialLinks = {
  facebook: 'https://www.facebook.com/share/166ieRm1tF/?mibextid=wwXIfr',
  instagram: 'https://www.instagram.com/umep.co?igsh=aHVwdng1Nm00aGY3',
};

export function getWhatsAppUrl(message?: string) {
  const baseUrl = `https://wa.me/${contactInfo.whatsappE164}`;
  if (!message) {
    return baseUrl;
  }
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}
