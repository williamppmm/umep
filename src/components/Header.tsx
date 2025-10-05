'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from './ui/Container';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
          {/* Logo - OPCIÓN 1: Icono + Texto (Recomendado) */}
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

          {/* Desktop Navigation */}
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
              href="https://wa.me/573003212328?text=Hola%20UMEP%2C%20necesito%20información%20sobre%20sus%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-umep-text px-5 py-2 rounded-2xl font-medium hover:opacity-90 transition-opacity"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
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
                href="https://wa.me/573003212328?text=Hola%20UMEP%2C%20necesito%20información%20sobre%20sus%20servicios"
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