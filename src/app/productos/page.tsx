import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import ProductsGrid from '@/components/ProductsGrid';
import CTAWhatsApp from '@/components/CTAWhatsApp';
import Icon from '@/components/ui/Icon';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Balanzas Electrónicas - Venta y Servicio',
  description:
    'Venta de balanzas industriales, comerciales y de precisión. Garantía, calibración y servicio técnico en Valle del Cauca.',
  alternates: {
    canonical: `${siteConfig.url}/productos`,
  },
};

export default function ProductosPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-600 py-16 text-white lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Balanzas electrónicas
            </h1>
            <p className="text-xl text-gray-200">
              Equipos de pesaje de calidad para industria, comercio y laboratorio.
              Garantía, calibración y servicio técnico incluido.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle
            centered
            subtitle="Contamos con modelos para diferentes aplicaciones y presupuestos"
          >
            Nuestros productos
          </SectionTitle>
          <ProductsGrid />
        </Container>
      </section>

      <section className="bg-gray-50 py-16">
        <Container>
          <SectionTitle centered>¿Por qué comprar con UMEP?</SectionTitle>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <Icon name="shieldCheck" size={36} className="mx-auto mb-3 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">Garantía incluida</h3>
              <p className="text-gray-600">De 3 a 6 meses según modelo</p>
            </div>
            <div className="text-center">
              <Icon name="wrench" size={36} className="mx-auto mb-3 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">Servicio técnico</h3>
              <p className="text-gray-600">Calibración y reparación disponible</p>
            </div>
            <div className="text-center">
              <Icon name="package" size={36} className="mx-auto mb-3 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">Entrega ágil</h3>
              <p className="text-gray-600">Consultar disponibilidad y tiempos</p>
            </div>
            <div className="text-center">
              <Icon
                name="badgeDollar"
                size={36}
                className="mx-auto mb-3 text-primary"
              />
              <h3 className="mb-2 text-lg font-semibold">Mejor precio</h3>
              <p className="text-gray-600">Precios competitivos del mercado</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-600 p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold">Próximamente: Más productos</h2>
            <p className="mb-6 text-xl text-gray-200">
              Estamos trabajando para ofrecerte una mayor variedad de equipos
              industriales y de laboratorio directamente importados.
            </p>
            <CTAWhatsApp
              message="Hola UMEP, quiero recibir información sobre nuevos productos cuando estén disponibles."
              label="Suscríbete por WhatsApp"
              className="inline-flex"
            />
          </div>
        </Container>
      </section>

      <section className="bg-gray-50 py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-umep-text">
              ¿Necesitas asesoría para elegir?
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Nuestro equipo te puede ayudar a seleccionar el equipo ideal según
              tus necesidades.
            </p>
            <CTAWhatsApp
              message="Hola UMEP, necesito asesoría para elegir una balanza."
              label="Consultar por WhatsApp"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
