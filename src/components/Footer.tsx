'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from './ui/Container';

export default function Footer() {
  const [showMadeWithLove, setShowMadeWithLove] = React.useState(false);

  return (
    <footer className="bg-primary text-white mt-20">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de la empresa */}
          <div>
            <Image
              src="/media/logo-letras-blanco.svg"
              alt="Logo de UMEP"
              width={160}
              height={76}
              className="mb-4"
              priority
            />
            <p className="text-gray-300 mb-4">
              Unidad de Mantenimiento Electrónico Profesional
            </p>
            <p className="text-sm text-gray-400">
              RUT: 1061719973-1
            </p>
            <p className="text-sm text-gray-400">
              Cali, Valle del Cauca — Colombia
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="https://wa.me/573003212328"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  WhatsApp: 300 321 2328
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto.umep@gmail.com"
                  className="hover:text-accent transition-colors"
                >
                  contacto.umep@gmail.com
                </a>
              </li>
            </ul>

            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/share/166ieRm1tF/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/umep.co?igsh=aHVwdng1Nm00aGY3"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces legales */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/legal/privacidad" className="hover:text-accent transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-600 py-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} UMEP - Unidad de Mantenimiento Electrónico Profesional. Todos los derechos reservados ·{' '}
            <button
              type="button"
              onClick={() => setShowMadeWithLove((prev) => !prev)}
              className="font-semibold text-accent hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              aria-expanded={showMadeWithLove}
            >
              Hecho con ❤️ en Cali
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
