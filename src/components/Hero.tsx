'use client';

import React from 'react';
import Image from 'next/image';
import Container from './ui/Container';
import Button from './ui/Button';
import CTAWhatsApp from './CTAWhatsApp';
import Icon from './ui/Icon';
import LogoUmep from './ui/LogoUmep';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0c1f3d] py-20 text-white lg:py-32">
      {/* Fondo base */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0c1f3d_0%,#14315f_45%,#274B88_100%)]" />

      {/* Grid técnico sutil */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 35%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 35%, transparent 90%)',
        }}
      />

      {/* Luces suaves */}
      <div className="absolute left-[-6rem] top-12 h-72 w-72 rounded-full bg-[rgba(93,136,199,0.22)] blur-3xl" />
      <div className="absolute right-[-4rem] top-24 h-[22rem] w-[22rem] rounded-full bg-white/[0.07] blur-3xl" />
      <div className="absolute bottom-[-5rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[rgba(8,17,34,0.4)] blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1933]/60 to-transparent" />

      {/* Logo decorativo de fondo – z-index 0, anclado a la sección */}
      <div
        className="absolute right-[-60px] top-1/2 hidden h-[580px] w-[580px] -translate-y-1/2 lg:block"
        style={{ zIndex: 0, pointerEvents: 'none' }}
      >
        {/* Anillo dashed exterior – spinReverse 50s */}
        <div className="absolute -inset-10 rounded-full border border-dashed border-white/[0.07]" style={{ animation: 'spinReverse 50s linear infinite' }} />
        {/* Anillo sólido con puntos cyan y glow orbital – spinForward 30s */}
        <div className="absolute -inset-5 rounded-full border border-[#38bdf8]/[0.15]" style={{ animation: 'spinForward 30s linear infinite' }}>
          {/* Punto superior con glow que orbita */}
          <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
          <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.15)_0%,transparent_70%)]" />
          {/* Punto inferior tenue */}
          <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#38bdf8]/40" />
        </div>
        {/* Glow radial estático centrado */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12)_0%,rgba(20,49,95,0.3)_50%,transparent_75%)]" />
        {/* Logo SVG ghost con pulso */}
        <div className="relative h-full w-full overflow-hidden rounded-full" style={{ animation: 'logoPulse 6s ease-in-out infinite' }}>
          <LogoUmep variant="ghost" size={580} className="text-white" />
        </div>
        {/* Borde luminoso */}
        <div className="absolute inset-0 rounded-full border border-[#38bdf8]/20 shadow-[0_0_40px_rgba(56,189,248,0.08),inset_0_0_40px_rgba(56,189,248,0.04)]" />
      </div>

      {/* Contenido – z-index 1, encima del logo */}
      <Container>
        <div className="relative grid items-center gap-12 lg:grid-cols-2" style={{ zIndex: 1 }}>
          {/* Columna izquierda */}
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.09] px-4 py-2 text-sm text-slate-200 backdrop-blur-md">
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#38bdf8]" />
              Servicio técnico industrial en Cali y Valle del Cauca
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[3.5rem]">
              Devolvemos vida a tus equipos industriales
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-200/90 md:text-xl">
              Reparación y mantenimiento profesional de electrónica de potencia
              e instrumentación para empresas que necesitan respuesta técnica
              confiable.
            </p>

            <div className="mb-10 flex flex-col gap-4 sm:flex-row">
              <Button
                variant="accent"
                onClick={() => {
                  const contactForm = document.getElementById('contacto');
                  contactForm?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto"
              >
                Agendar servicio
              </Button>
              <CTAWhatsApp
                message="Hola UMEP, necesito información sobre sus servicios de mantenimiento y reparación industrial."
                label="WhatsApp"
                className="w-full sm:w-auto"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.09] p-4 backdrop-blur-md transition-colors hover:bg-white/[0.13]">
                <Icon name="zap" size={26} className="mb-2 text-[#38bdf8]" />
                <h3 className="mb-1 text-sm font-semibold">Diagnóstico rápido</h3>
                <p className="text-xs leading-relaxed text-slate-200/85">Respuesta en 24–48h hábiles</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.09] p-4 backdrop-blur-md transition-colors hover:bg-white/[0.13]">
                <Icon name="wrench" size={26} className="mb-2 text-[#38bdf8]" />
                <h3 className="mb-1 text-sm font-semibold">Especialistas</h3>
                <p className="text-xs leading-relaxed text-slate-200/85">Experiencia en electrónica de potencia</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.09] p-4 backdrop-blur-md transition-colors hover:bg-white/[0.13]">
                <Icon name="shieldCheck" size={26} className="mb-2 text-[#38bdf8]" />
                <h3 className="mb-1 text-sm font-semibold">Garantía incluida</h3>
                <p className="text-xs leading-relaxed text-slate-200/85">Reporte técnico post-servicio</p>
              </div>
            </div>
          </div>

          {/* Columna derecha – tarjeta sobre el logo */}
          <div className="relative hidden items-center justify-center lg:flex">
            <div className="relative w-full max-w-[400px] rounded-[28px] border border-white/10 bg-white/[0.09] p-7 shadow-[0_24px_80px_rgba(7,15,30,0.30)] backdrop-blur-[22px]">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p className="mb-1 text-sm text-slate-400">Unidad técnica</p>
                  <h3 className="text-xl font-semibold text-white">Diagnóstico y reparación</h3>
                </div>
                <Image
                  src="/media/logo-letras-blanco.svg"
                  alt="UMEP"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-white/10 bg-[rgba(15,35,69,0.55)] p-4 transition-colors hover:bg-[rgba(15,35,69,0.75)]">
                  <p className="mb-1 text-xs text-slate-400">Tiempo de respuesta</p>
                  <p className="text-base font-semibold">24 horas hábiles</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-[rgba(15,35,69,0.55)] p-4 transition-colors hover:bg-[rgba(15,35,69,0.75)]">
                    <p className="mb-1 text-xs text-slate-400">Cobertura</p>
                    <p className="font-semibold">Cali y Valle</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[rgba(15,35,69,0.55)] p-4 transition-colors hover:bg-[rgba(15,35,69,0.75)]">
                    <p className="mb-1 text-xs text-slate-400">Soporte</p>
                    <p className="font-semibold">WhatsApp directo</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[rgba(15,35,69,0.55)] p-4 transition-colors hover:bg-[rgba(15,35,69,0.75)]">
                  <p className="mb-1 text-xs text-slate-400">Especialidad</p>
                  <p className="font-semibold">Electrónica de potencia e instrumentación</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
