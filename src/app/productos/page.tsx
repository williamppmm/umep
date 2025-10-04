import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import ProductsGrid from '@/components/ProductsGrid';
import CTAWhatsApp from '@/components/CTAWhatsApp';

export const metadata: Metadata = {
  title: 'Balanzas Electrónicas - Venta y Servicio',
  description: 'Venta de balanzas industriales, comerciales y de precisión. Garantía, calibración y servicio técnico en Valle del Cauca.',
};

export default function ProductosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary-600 text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Balanzas electrónicas
            </h1>
            <p className="text-xl text-gray-200">
              Equipos de pesaje de calidad para industria, comercio y laboratorio. Garantía, calibración y servicio técnico incluido.
            </p>
          </div>
        </Container>
      </section>

      {/* Productos */}
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

      {/* Características del servicio */}
      <section className="py-16 bg-gray-50">
        <Container>
          <SectionTitle centered>
            ¿Por qué comprar con UMEP?
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-semibold text-lg mb-2">Garantía incluida</h3>
              <p className="text-gray-600">De 3 a 6 meses según modelo</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔧</div>
              <h3 className="font-semibold text-lg mb-2">Servicio técnico</h3>
              <p className="text-gray-600">Calibración y reparación disponible</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📦</div>
              <h3 className="font-semibold text-lg mb-2">Entrega ágil</h3>
              <p className="text-gray-600">Consultar disponibilidad y tiempos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-semibold text-lg mb-2">Mejor precio</h3>
              <p className="text-gray-600">Precios competitivos del mercado</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Próximamente */}
      <section className="py-16">
        <Container>
          <div className="bg-gradient-to-r from-primary to-primary-600 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Próximamente: Más productos
            </h2>
            <p className="text-xl text-gray-200 mb-6">
              Estamos trabajando para ofrecerte una mayor variedad de equipos industriales y de laboratorio directamente importados.
            </p>
            <CTAWhatsApp
              message="Hola UMEP, quiero recibir información sobre nuevos productos cuando estén disponibles."
              label="Suscríbete por WhatsApp"
              className="inline-flex"
            />
          </div>
        </Container>
      </section>

      {/* CTA Contacto */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-umep-text mb-4">
              ¿Necesitas asesoría para elegir?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Nuestro equipo te puede ayudar a seleccionar el equipo ideal según tus necesidades
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
