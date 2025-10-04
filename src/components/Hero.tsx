'use client';

import React from 'react';
import Container from './ui/Container';
import Button from './ui/Button';
import CTAWhatsApp from './CTAWhatsApp';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary-600 text-white py-20 lg:py-28">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Devolvemos vida a tus equipos industriales
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Mantenimiento y reparación profesional de electrónica de potencia e instrumentación.
            <br />
            <span className="text-accent font-medium">Servicio en Cali y Valle del Cauca.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-accent text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">Diagnóstico rápido</h3>
              <p className="text-gray-200 text-sm">Respuesta en 24-48h hábiles</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-accent text-3xl mb-2">🔧</div>
              <h3 className="font-semibold mb-2">Técnicos especialistas</h3>
              <p className="text-gray-200 text-sm">Experiencia en electrónica de potencia</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-accent text-3xl mb-2">✅</div>
              <h3 className="font-semibold mb-2">Garantía incluida</h3>
              <p className="text-gray-200 text-sm">Reporte técnico post-servicio</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
