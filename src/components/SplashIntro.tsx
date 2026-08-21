'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SPLASH_SESSION_KEY = 'umep-intro-shown';
const SPLASH_MOUNT_FALLBACK_MS = 6000;
const SPLASH_PLAYBACK_FALLBACK_MS = 4200;

export default function SplashIntro() {
  const [visible, setVisible] = useState(false);
  const startedRef = useRef(false);
  const mountTimeoutRef = useRef<number | null>(null);
  const playbackTimeoutRef = useRef<number | null>(null);

  const clearTimeouts = useCallback(() => {
    if (mountTimeoutRef.current !== null) {
      window.clearTimeout(mountTimeoutRef.current);
      mountTimeoutRef.current = null;
    }

    if (playbackTimeoutRef.current !== null) {
      window.clearTimeout(playbackTimeoutRef.current);
      playbackTimeoutRef.current = null;
    }
  }, []);

  const dismiss = useCallback(() => {
    clearTimeouts();
    setVisible(false);
  }, [clearTimeouts]);

  const handlePlaying = useCallback(() => {
    if (mountTimeoutRef.current !== null) {
      window.clearTimeout(mountTimeoutRef.current);
      mountTimeoutRef.current = null;
    }

    if (playbackTimeoutRef.current !== null) return;

    playbackTimeoutRef.current = window.setTimeout(dismiss, SPLASH_PLAYBACK_FALLBACK_MS);
  }, [dismiss]);

  useEffect(() => {
    if (!startedRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      try {
        if (window.sessionStorage.getItem(SPLASH_SESSION_KEY)) return;
        window.sessionStorage.setItem(SPLASH_SESSION_KEY, 'true');
      } catch {
        // La intro sigue funcionando si el navegador bloquea sessionStorage.
      }

      startedRef.current = true;
      setVisible(true);
    }

    mountTimeoutRef.current = window.setTimeout(dismiss, SPLASH_MOUNT_FALLBACK_MS);
    return clearTimeouts;
  }, [clearTimeouts, dismiss]);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="fixed inset-0 z-50 flex h-full w-full cursor-pointer items-center justify-center border-0 bg-primary/95 p-0 backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-secondary"
      onClick={dismiss}
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
        onPlaying={handlePlaying}
        onEnded={dismiss}
        onError={dismiss}
      />
      <span className="absolute bottom-6 right-6 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/90">
        Omitir
      </span>
    </button>
  );
}
