import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTAWhatsApp from '@/components/CTAWhatsApp';
import Ticker from '@/components/Ticker';
import ServicesGrid from '@/components/ServicesGrid';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Servicios de Mantenimiento y Reparación Industrial',
  description:
    'Mantenimiento y reparación profesional de variadores, PLCs, HMIs, balanzas y más. Servicio técnico especializado en Valle del Cauca.',
  alternates: {
    canonical: `${siteConfig.url}/servicios`,
  },
};

export default function ServiciosPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-600 py-16 text-white lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Servicios técnicos especializados
            </h1>
            <p className="text-xl text-gray-200">
              Mantenimiento, reparación y restauración profesional de equipos de
              electrónica de potencia e instrumentación industrial.
            </p>
          </div>
        </Container>
      </section>
      <div className="mt-10">
        <Ticker />
      </div>

      <section className="py-16 lg:py-24">
        <Container>
          <ServicesGrid />
        </Container>
      </section>

      <section className="bg-gray-50 py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-umep-text">
              ¿No encuentras tu equipo?
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Contáctanos para consultar sobre otros equipos y servicios
              especializados.
            </p>
            <CTAWhatsApp
              message="Hola UMEP, necesito información sobre un servicio que no encuentro en la web."
              label="Consultar por WhatsApp"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
