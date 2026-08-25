import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import CTAWhatsApp from '@/components/CTAWhatsApp';
import Icon from '@/components/ui/Icon';
import ServiceIcon from '@/components/ui/ServiceIcon';
import StructuredData from '@/components/StructuredData';
import servicesData from '@/content/services.json';
import { siteConfig } from '@/lib/siteConfig';

const services = servicesData;

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  const title = `${service.title} | Reparación y Mantenimiento`;

  return {
    title,
    description: service.description,
    alternates: {
      canonical: `${siteConfig.url}/servicios/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.legalName,
      '@id': siteConfig.url,
    },
    areaServed: {
      '@type': 'State',
      name: 'Valle del Cauca',
    },
    url: `${siteConfig.url}/servicios/${service.slug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <StructuredData data={serviceSchema} />
      <StructuredData data={faqSchema} />

      <section className="bg-gradient-to-br from-primary to-primary-600 py-16 text-white lg:py-20">
        <Container>
          <Link
            href="/servicios"
            className="mb-6 inline-flex items-center text-sm text-gray-200 transition-colors hover:text-white"
          >
            <Icon name="arrowRight" size={16} className="mr-1 rotate-180" aria-hidden />
            Todos los servicios
          </Link>
          <div className="flex max-w-3xl items-start gap-5">
            <ServiceIcon slug={service.slug} size={56} className="mt-1 flex-shrink-0 text-accent" />
            <div>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">{service.title}</h1>
              <p className="text-xl text-gray-200">{service.excerpt}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="mb-10 text-lg leading-relaxed text-gray-700">{service.description}</p>

              <div className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-umep-text">Síntomas comunes</h2>
                <ul className="space-y-3">
                  {service.symptoms.map((symptom, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <Icon
                        name="check"
                        size={16}
                        className="mr-3 mt-1 flex-shrink-0 text-primary"
                        aria-hidden
                      />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-umep-text">Cómo trabajamos</h2>
                <ol className="space-y-4">
                  {service.process.map((step, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <span className="mr-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {idx + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-umep-text">Preguntas frecuentes</h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, idx) => (
                    <Card key={idx}>
                      <h3 className="mb-2 font-semibold text-umep-text">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <h3 className="mb-3 font-semibold text-umep-text">Alcance del servicio</h3>
                <ul className="mb-6 space-y-2">
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <Icon
                        name="check"
                        size={16}
                        className="mr-3 mt-0.5 flex-shrink-0 text-primary"
                        aria-hidden
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <h3 className="mb-3 font-semibold text-umep-text">Marcas compatibles</h3>
                <div className="mb-6 flex flex-wrap gap-2">
                  {service.brands.map((brand, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {brand}
                    </span>
                  ))}
                </div>

                <CTAWhatsApp
                  message={`Hola UMEP, necesito información sobre ${service.title}. `}
                  label={service.cta}
                  className="w-full"
                />
              </Card>
            </div>
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
              Contáctanos para consultar sobre otros equipos y servicios especializados.
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
