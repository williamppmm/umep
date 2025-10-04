import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import CTAWhatsApp from '@/components/CTAWhatsApp';
import services from '@/content/services.json';

export const metadata: Metadata = {
  title: 'Servicios de Mantenimiento y Reparación Industrial',
  description: 'Mantenimiento y reparación profesional de variadores, PLCs, HMIs, balanzas y más. Servicio técnico especializado en Valle del Cauca.',
};

export default function ServiciosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary-600 text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Servicios técnicos especializados
            </h1>
            <p className="text-xl text-gray-200">
              Mantenimiento, reparación y restauración profesional de equipos de electrónica de potencia e instrumentación industrial.
            </p>
          </div>
        </Container>
      </section>

      {/* Lista de servicios */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="space-y-12">
            {services.map((service, index) => (
              <Card key={service.slug} className="hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Icono y título */}
                  <div className="lg:col-span-1">
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <h2 className="text-2xl font-bold text-umep-text mb-3">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{service.excerpt}</p>
                  </div>

                  {/* Descripción y detalles */}
                  <div className="lg:col-span-2">
                    <p className="text-gray-700 mb-6">{service.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Características */}
                      <div>
                        <h3 className="font-semibold text-umep-text mb-3">Alcance del servicio:</h3>
                        <ul className="space-y-2">
                          {service.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-gray-600 flex items-start">
                              <span className="text-accent mr-2 mt-1">✓</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Marcas */}
                      <div>
                        <h3 className="font-semibold text-umep-text mb-3">Marcas compatibles:</h3>
                        <div className="flex flex-wrap gap-2">
                          {service.brands.map((brand, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {brand}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-6">
                          <CTAWhatsApp
                            message={`Hola UMEP, necesito información sobre ${service.title}. `}
                            label={service.cta}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-umep-text mb-4">
              ¿No encuentras tu equipo?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Contáctanos para consultar sobre otros equipos y servicios especializados
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
