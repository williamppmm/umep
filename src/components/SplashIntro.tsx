'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 backdrop-blur-sm">
      <Image
        src="/media/umep-splash.gif"
        alt="Animación de circuito UMEP"
        width={320}
        height={214}
        unoptimized
        priority
      />
    </div>
  );
}
