'use client';

import { useEffect, useState } from 'react';

const SPLASH_SESSION_KEY = 'umep-intro-shown';
const SPLASH_FALLBACK_MS = 3600;

export default function SplashIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    try {
      if (window.sessionStorage.getItem(SPLASH_SESSION_KEY)) return;
      window.sessionStorage.setItem(SPLASH_SESSION_KEY, 'true');
    } catch {
      // La intro sigue funcionando si el navegador bloquea sessionStorage.
    }

    setVisible(true);
    const timeout = window.setTimeout(() => setVisible(false), SPLASH_FALLBACK_MS);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="fixed inset-0 z-50 flex h-full w-full cursor-pointer items-center justify-center border-0 bg-primary/95 p-0 backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-secondary"
      onClick={() => setVisible(false)}
      aria-label="Omitir introducción de UMEP"
    >
      <video
        src="/media/umep-intro.mp4"
        width={320}
        height={214}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="pointer-events-none h-auto w-[320px] max-w-[80vw]"
        onEnded={() => setVisible(false)}
        onError={() => setVisible(false)}
      />
      <span className="absolute bottom-6 right-6 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/90">
        Omitir
      </span>
    </button>
  );
}
