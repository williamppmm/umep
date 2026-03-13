import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import CTAWhatsApp from '@/components/CTAWhatsApp';
import Ticker from '@/components/Ticker';
import Icon from '@/components/ui/Icon';
import ServiceIcon from '@/components/ui/ServiceIcon';
import servicesData from '@/content/services.json';
import { siteConfig } from '@/lib/siteConfig';

const services = servicesData;

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
          <div className="space-y-12">
            {services.map((service) => (
              <Card key={service.slug} className="transition-shadow hover:shadow-lg">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-1">
                    <ServiceIcon slug={service.slug} size={56} className="mb-4 text-accent" />
                    <h2 className="mb-3 text-2xl font-bold text-umep-text">
                      {service.title}
                    </h2>
                    <p className="mb-4 text-gray-600">{service.excerpt}</p>
                  </div>

                  <div className="lg:col-span-2">
                    <p className="mb-6 text-gray-700">{service.description}</p>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="mb-3 font-semibold text-umep-text">
                          Alcance del servicio:
                        </h3>
                        <ul className="space-y-2">
                          {service.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start text-gray-600">
                              <Icon
                                name="check"
                                size={16}
                                className="mr-3 mt-1 flex-shrink-0 text-primary"
                              />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="mb-3 font-semibold text-umep-text">
                          Marcas compatibles:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {service.brands.map((brand, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                            >
                              {brand}
                            </span>
                          ))}
                        </div>

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
