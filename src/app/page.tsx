import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import ServicesGrid from '@/components/ServicesGrid';
import ProductsGrid from '@/components/ProductsGrid';
import ClientsShowcase from '@/components/ClientsShowcase';
import LeadForm from '@/components/LeadForm';
import CTAWhatsApp from '@/components/CTAWhatsApp';
import StructuredData, {
  localBusinessData,
  organizationData,
} from '@/components/StructuredData';
import Icon from '@/components/ui/Icon';

export default function Home() {
  return (
    <>
      <StructuredData data={localBusinessData} />
      <StructuredData data={organizationData} />
      <Hero />

      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle
            centered
            subtitle="Especialistas en electrónica de potencia e instrumentación industrial"
          >
            Nuestros servicios
          </SectionTitle>
          <ServicesGrid limit={6} />
          <div className="mt-8 text-center">
            <Link
              href="/servicios"
              className="inline-flex items-center font-medium text-primary transition-colors hover:text-primary-600"
            >
              Ver todos los servicios
              <Icon name="arrowRight" size={20} className="ml-1" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <ClientsShowcase />

      <section className="bg-gray-50 py-16 lg:py-24">
        <Container>
          <SectionTitle
            centered
            subtitle="Balanzas electrónicas de calidad para tu negocio"
          >
            Productos destacados
          </SectionTitle>
          <ProductsGrid limit={3} />
          <div className="mt-8 text-center">
            <Link
              href="/productos"
              className="inline-flex items-center font-medium text-primary transition-colors hover:text-primary-600"
            >
              Ver todos los productos
              <Icon name="arrowRight" size={20} className="ml-1" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle
            centered
            subtitle="Atendemos empresas en todo el Valle del Cauca"
          >
            Cobertura y tiempos de respuesta
          </SectionTitle>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <Icon name="mapPin" size={36} className="mx-auto mb-3 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">Zona de cobertura</h3>
              <p className="text-gray-600">
                Cali, Yumbo, Palmira, Jamundí y municipios del Valle.
              </p>
            </div>
            <div className="text-center">
              <Icon name="timer" size={36} className="mx-auto mb-3 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">Respuesta rápida</h3>
              <p className="text-gray-600">
                24-48 horas hábiles para diagnóstico inicial.
              </p>
            </div>
            <div className="text-center">
              <Icon
                name="shieldCheck"
                size={36}
                className="mx-auto mb-3 text-primary"
              />
              <h3 className="mb-2 text-lg font-semibold">Garantía incluida</h3>
              <p className="text-gray-600">Hasta 90 días según tipo de servicio</p>
            </div>
            <div className="text-center">
              <Icon name="clipboard" size={36} className="mx-auto mb-3 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">Reporte técnico</h3>
              <p className="text-gray-600">Documentación completa de cada servicio</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <Container>
          <SectionTitle centered>Cuéntanos sobre tu equipo</SectionTitle>
          <LeadForm />
        </Container>
      </section>

      <section className="bg-primary py-16 text-white lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              ¿Necesitas atención inmediata?
            </h2>
            <p className="mb-8 text-xl text-gray-200">
              Contáctanos directamente por WhatsApp y te responderemos a la
              brevedad.
            </p>
            <CTAWhatsApp
              message="Hola UMEP, necesito atención urgente para un equipo industrial."
              label="Contactar por WhatsApp"
              className="inline-flex"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
