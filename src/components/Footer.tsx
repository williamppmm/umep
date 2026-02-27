'use client';
import React from 'react';
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
  const [showMadeWithLove, setShowMadeWithLove] = React.useState(false);

  return (
    <footer className="bg-primary text-white mt-20">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/media/logo-letras-blanco.svg"
              alt="Logo de UMEP"
              width={160}
              height={76}
              className="mb-4"
              priority
            />
            <p className="text-gray-300 mb-4">{siteConfig.legalName}</p>
            <p className="text-sm text-gray-400">RUT: 1061719973-1</p>
            <p className="text-sm text-gray-400">
              {contactInfo.city}, {contactInfo.region} - {contactInfo.country}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  WhatsApp: {contactInfo.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>

            <div className="flex space-x-4 mt-4">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Icon name="facebook" size={24} aria-hidden />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Icon name="instagram" size={24} aria-hidden />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="/legal/privacidad"
                  className="hover:text-accent transition-colors"
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
            Electrónico Profesional. Todos los derechos reservados ·{' '}
            <button
              type="button"
              onClick={() => setShowMadeWithLove((prev) => !prev)}
              className="font-semibold text-accent hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              aria-expanded={showMadeWithLove}
            >
              Hecho con{' '}
              <span className="inline-flex items-center justify-center align-middle">
                <Icon name="heart" size={16} className="text-accent" aria-hidden />
              </span>{' '}
              en Cali
            </button>
          </p>
          {showMadeWithLove && (
            <p className="mt-3 text-xs text-gray-300">
              ¿Te gusta este sitio? Creamos páginas web personalizadas
              <br />
              WhatsApp:{' '}
              <a
                href="https://wa.me/573152728882"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-accent transition-colors"
              >
                +57 315 272 8882
              </a>
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}
