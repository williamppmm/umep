'use client';

import React from 'react';
import Container from './ui/Container';
import Button from './ui/Button';
import CTAWhatsApp from './CTAWhatsApp';
import Icon from './ui/Icon';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#10284f] py-16 text-white lg:py-24">
      {/* Fondo base */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0c1f3d_0%,#14315f_45%,#274B88_100%)]" />

      {/* Grid técnico sutil */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(circle at center, black 35%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, black 35%, transparent 90%)',
        }}
      />

      {/* Luces suaves */}
      <div className="absolute left-[-6rem] top-12 h-56 w-56 rounded-full bg-[#5d88c7]/20 blur-3xl" />
      <div className="absolute right-[-4rem] top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-[-6rem] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#081122]/40 blur-3xl" />

      {/* Líneas técnicas decorativas */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <div className="absolute right-16 top-20 h-[420px] w-[420px] rounded-full border border-white/10" />
        <div className="absolute right-24 top-28 h-[320px] w-[320px] rounded-full border border-white/10" />
        <div className="absolute right-36 top-44 h-[180px] w-[180px] rounded-full border border-white/10" />
        <div className="absolute right-20 top-40 h-px w-52 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute right-40 top-64 h-px w-40 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute right-48 top-80 h-px w-56 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1933]/60 to-transparent" />

      <Container>
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          {/* Columna izquierda */}
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-100 backdrop-blur-md">
              Servicio técnico industrial en Cali y Valle del Cauca
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Devolvemos vida a tus equipos industriales
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-100/90 md:text-xl">
              Reparación y mantenimiento profesional de electrónica de potencia
              e instrumentación para empresas que necesitan respuesta técnica
              confiable.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
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

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <Icon name="zap" size={26} className="mb-2 text-accent" />
                <h3 className="text-sm font-semibold">Diagnóstico rápido</h3>
                <p className="mt-1 text-sm text-slate-200/90">
                  Respuesta en 24–48h hábiles
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <Icon name="wrench" size={26} className="mb-2 text-accent" />
                <h3 className="text-sm font-semibold">Especialistas</h3>
                <p className="mt-1 text-sm text-slate-200/90">
                  Experiencia en electrónica de potencia
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <Icon name="shieldCheck" size={26} className="mb-2 text-accent" />
                <h3 className="text-sm font-semibold">Garantía incluida</h3>
                <p className="mt-1 text-sm text-slate-200/90">
                  Reporte técnico post-servicio
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto max-w-md rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-[0_24px_80px_rgba(7,15,30,0.28)] backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Unidad técnica</p>
                  <h3 className="text-xl font-semibold text-white">
                    Diagnóstico y reparación
                  </h3>
                </div>
                <img
                  src="/media/logo-letras-blanco.svg"
                  alt="UMEP"
                  className="h-10 w-auto"
                />
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-[#0f2345]/50 p-4">
                  <p className="text-sm text-slate-300">Tiempo de respuesta</p>
                  <p className="mt-1 text-lg font-semibold">24–48h hábiles</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-[#0f2345]/50 p-4">
                    <p className="text-sm text-slate-300">Cobertura</p>
                    <p className="mt-1 font-semibold">Cali y Valle</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#0f2345]/50 p-4">
                    <p className="text-sm text-slate-300">Soporte</p>
                    <p className="mt-1 font-semibold">WhatsApp directo</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0f2345]/50 p-4">
                  <p className="text-sm text-slate-300">Especialidad</p>
                  <p className="mt-1 font-semibold">
                    Electrónica de potencia e instrumentación
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
