'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from './ui/Container';
import Icon from './ui/Icon';
import { getWhatsAppUrl } from '@/lib/siteConfig';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappHref = getWhatsAppUrl(
    'Hola UMEP, necesito información sobre sus servicios'
  );

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Productos', href: '/productos' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <header className="bg-white border-b border-umep-border sticky top-0 z-50 shadow-sm">
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/media/logo-umep.svg"
                alt="UMEP"
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-umep-text hover:text-primary font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-umep-text px-5 py-2 rounded-2xl font-medium hover:opacity-90 transition-opacity"
            >
              WhatsApp
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <Icon name={isOpen ? 'x' : 'menu'} size={24} aria-hidden />
          </button>
        </nav>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-umep-border">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-umep-text hover:text-primary font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-umep-text px-5 py-2 rounded-2xl font-medium hover:opacity-90 transition-opacity text-center"
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
