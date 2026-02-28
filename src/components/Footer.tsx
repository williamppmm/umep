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
                Atencion tecnica: <span className="font-medium">Ing. Carol Andrea Jimenez</span>
              </li>
            </ul>

            <div className="mt-4 flex space-x-4">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
                aria-label="Facebook"
              >
                <Icon name="facebook" size={24} aria-hidden />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
                aria-label="Instagram"
              >
                <Icon name="instagram" size={24} aria-hidden />
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
                  Politica de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-600 py-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} UMEP - Unidad de Mantenimiento
            Electronico Profesional. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
