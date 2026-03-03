'use client';

import React from 'react';
import Container from './ui/Container';
import Button from './ui/Button';
import CTAWhatsApp from './CTAWhatsApp';
import Icon from './ui/Icon';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1A3A6E] py-20 text-white lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgba(120,166,224,0.12),transparent_24%),radial-gradient(circle_at_92%_16%,rgba(255,255,255,0.09),transparent_20%),radial-gradient(circle_at_72%_78%,rgba(8,17,34,0.35),transparent_26%),linear-gradient(135deg,#10284f_0%,#1A3A6E_45%,#274B88_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
          maskImage:
            'radial-gradient(circle at center, black 42%, transparent 88%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, black 42%, transparent 88%)',
        }}
      />
      <div className="absolute left-[-8%] top-12 h-40 w-40 rounded-full bg-[#5d88c7]/10 blur-3xl" />
      <div className="absolute right-[-9%] top-20 h-64 w-64 rounded-full bg-white/6 blur-3xl" />
      <div className="absolute bottom-[-5rem] left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#0c1730]/40 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0f2345]/45 to-transparent" />

      <Container>
        <div className="relative mx-auto max-w-4xl text-center">
          <h1
            className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            style={{ textShadow: '0 10px 30px rgba(7, 15, 30, 0.22)' }}
          >
            Devolvemos vida a tus equipos industriales
          </h1>
          <p className="mb-8 text-xl text-slate-100/90 md:text-2xl">
            Mantenimiento y reparacion profesional de electronica de potencia e
            instrumentacion.
            <br />
            <span className="font-medium text-accent">
              Servicio en Cali y Valle del Cauca.
            </span>
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
              message="Hola UMEP, necesito informacion sobre sus servicios de mantenimiento y reparacion industrial."
              label="WhatsApp"
              className="w-full sm:w-auto"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-[0_18px_60px_rgba(7,15,30,0.18)] backdrop-blur-md">
              <Icon name="zap" size={32} className="mb-2 text-accent" />
              <h3 className="mb-2 font-semibold">Diagnostico rapido</h3>
              <p className="text-sm text-gray-200">Respuesta en 24-48h habiles</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-[0_18px_60px_rgba(7,15,30,0.18)] backdrop-blur-md">
              <Icon name="wrench" size={32} className="mb-2 text-accent" />
              <h3 className="mb-2 font-semibold">Tecnicos especialistas</h3>
              <p className="text-sm text-gray-200">
                Experiencia en electronica de potencia
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-[0_18px_60px_rgba(7,15,30,0.18)] backdrop-blur-md">
              <Icon name="shieldCheck" size={32} className="mb-2 text-accent" />
              <h3 className="mb-2 font-semibold">Garantia incluida</h3>
              <p className="text-sm text-gray-200">Reporte tecnico post-servicio</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
