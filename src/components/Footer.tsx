'use client';
import Link from 'next/link';
import Image from 'next/image';
import Container from './ui/Container';
import Icon from './ui/Icon';
import {
  contactInfo,
  getWhatsAppUrl,
  siteConfig,
  socialLinks,
} from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer className="mt-20 bg-primary text-white">
      <Container>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div>
            <Image
              src="/media/logo-letras-blanco.svg"
              alt="Logo de UMEP"
              width={160}
              height={76}
              className="mb-4"
              priority
            />
            <p className="mb-4 text-gray-300">{siteConfig.legalName}</p>
            <p className="text-sm text-gray-400">RUT: 1061719973-1</p>
            <p className="text-sm text-gray-400">
              {contactInfo.city}, {contactInfo.region} - {contactInfo.country}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  WhatsApp: {contactInfo.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="pt-2 text-sm text-gray-300">
                Atención técnica:{' '}
                <span className="font-medium">Ing. Carol Andrea Jiménez</span>
              </li>
            </ul>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-btn social-btn-facebook group relative flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-[#1877F2] hover:bg-[rgba(24,119,242,0.15)]"
              >
                <span
                  className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full bg-[#1877F2] transition-transform duration-300 group-hover:-rotate-[8deg] group-hover:scale-110"
                  style={{ boxShadow: '0 3px 12px rgba(24,119,242,0.45)' }}
                >
                  <Icon name="facebook" size={13} aria-hidden />
                </span>
                Facebook
              </a>

              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-btn social-btn-instagram group relative flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-[#cc2366] hover:bg-[rgba(193,53,132,0.12)]"
                style={{ animationDelay: '1.5s' }}
              >
                <span
                  className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-[8deg] group-hover:scale-110"
                  style={{
                    background:
                      'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    boxShadow: '0 3px 12px rgba(193,53,132,0.5)',
                  }}
                >
                  <Icon name="instagram" size={13} aria-hidden />
                </span>
                Instagram
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="/legal/privacidad"
                  className="transition-colors hover:text-accent"
                >
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-600 py-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} UMEP - Unidad de Mantenimiento
            Electrónico Profesional. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
