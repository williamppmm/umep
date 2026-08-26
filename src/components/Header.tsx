'use client';

import React, { useLayoutEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from './ui/Container';
import Icon from './ui/Icon';
import { getWhatsAppUrl } from '@/lib/siteConfig';
import {
  MOTION_CHANGE_EVENT,
  MOTION_PAUSED_CLASS,
  MOTION_STORAGE_KEY,
} from '@/lib/motionPreference';

function getMotionSnapshot() {
  return document.documentElement.classList.contains(MOTION_PAUSED_CLASS);
}

function getServerMotionSnapshot() {
  return false;
}

function subscribeToMotionPreference(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== MOTION_STORAGE_KEY) return;
    document.documentElement.classList.toggle(
      MOTION_PAUSED_CLASS,
      event.newValue === 'true'
    );
    onStoreChange();
  };

  window.addEventListener(MOTION_CHANGE_EVENT, onStoreChange);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(MOTION_CHANGE_EVENT, onStoreChange);
    window.removeEventListener('storage', handleStorage);
  };
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const motionPaused = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionSnapshot,
    getServerMotionSnapshot
  );
  const whatsappHref = getWhatsAppUrl(
    'Hola UMEP, necesito información sobre sus servicios'
  );

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Productos', href: '/productos' },
    { name: 'Contacto', href: '/contacto' },
  ];

  useLayoutEffect(() => {
    try {
      const isPaused = localStorage.getItem(MOTION_STORAGE_KEY) === 'true';
      document.documentElement.classList.toggle(MOTION_PAUSED_CLASS, isPaused);
      window.dispatchEvent(new Event(MOTION_CHANGE_EVENT));
    } catch {
      // La preferencia sigue funcionando durante la sesión aunque Storage no esté disponible.
    }
  }, []);

  const toggleMotion = () => {
    const nextPaused = !motionPaused;
    document.documentElement.classList.toggle(MOTION_PAUSED_CLASS, nextPaused);
    try {
      localStorage.setItem(MOTION_STORAGE_KEY, String(nextPaused));
    } catch {
      // La clase aplicada conserva el control durante la sesión actual.
    }
    window.dispatchEvent(new Event(MOTION_CHANGE_EVENT));
  };

  const motionLabel = motionPaused ? 'Reanudar animaciones' : 'Pausar animaciones';

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
            <button
              type="button"
              onClick={toggleMotion}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-umep-border text-primary transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={motionLabel}
              aria-pressed={motionPaused}
              title={motionLabel}
            >
              <Icon name={motionPaused ? 'play' : 'pause'} size={18} aria-hidden />
            </button>
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
              <button
                type="button"
                onClick={toggleMotion}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-umep-border px-5 py-2 font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-pressed={motionPaused}
              >
                <Icon name={motionPaused ? 'play' : 'pause'} size={18} aria-hidden />
                {motionLabel}
              </button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
