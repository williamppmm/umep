import Hero from '@/components/Hero';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import ServicesGrid from '@/components/ServicesGrid';
import ProductsGrid from '@/components/ProductsGrid';
import LeadForm from '@/components/LeadForm';
import CTAWhatsApp from '@/components/CTAWhatsApp';
import StructuredData, { localBusinessData } from '@/components/StructuredData';

export default function Home() {
  return (
    <>
      <StructuredData data={localBusinessData} />
      <Hero />

      {/* Servicios */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle
            centered
            subtitle="Especialistas en electrónica de potencia e instrumentación industrial"
          >
            Nuestros servicios
          </SectionTitle>
          <ServicesGrid limit={6} />
          <div className="text-center mt-8">
            <a
              href="/servicios"
              className="text-primary font-medium hover:text-primary-600 transition-colors inline-flex items-center"
            >
              Ver todos los servicios
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </Container>
      </section>

      {/* Productos (Balanzas) */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <Container>
          <SectionTitle
            centered
            subtitle="Balanzas electrónicas de calidad para tu negocio"
          >
            Productos destacados
          </SectionTitle>
          <ProductsGrid limit={3} />
          <div className="text-center mt-8">
            <a
              href="/productos"
              className="text-primary font-medium hover:text-primary-600 transition-colors inline-flex items-center"
            >
              Ver todos los productos
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </Container>
      </section>

      {/* Cobertura y tiempos */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle
            centered
            subtitle="Atendemos empresas en todo el Valle del Cauca"
          >
            Cobertura y tiempos de respuesta
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-semibold text-lg mb-2">Zona de cobertura</h3>
              <p className="text-gray-600">Cali, Yumbo, Palmira, Jamundí y municipios del Valle</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⏱️</div>
              <h3 className="font-semibold text-lg mb-2">Respuesta rápida</h3>
              <p className="text-gray-600">24-48 horas hábiles para diagnóstico inicial</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-semibold text-lg mb-2">Garantía incluida</h3>
              <p className="text-gray-600">Hasta 90 días según tipo de servicio</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📋</div>
              <h3 className="font-semibold text-lg mb-2">Reporte técnico</h3>
              <p className="text-gray-600">Documentación completa de cada servicio</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Formulario de contacto */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <Container>
          <SectionTitle centered>
            Cuéntanos sobre tu equipo
          </SectionTitle>
          <LeadForm />
        </Container>
      </section>

      {/* CTA Final WhatsApp */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Necesitas atención inmediata?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Contáctanos directamente por WhatsApp y te responderemos a la brevedad
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
