import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import LeadForm from '@/components/LeadForm';
import CTAWhatsApp from '@/components/CTAWhatsApp';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Contacto - UMEP',
  description: 'Contáctanos para servicios de mantenimiento y reparación industrial en Valle del Cauca. WhatsApp: 300 321 2328',
};

export default function ContactoPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary-600 text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contáctanos
            </h1>
            <p className="text-xl text-gray-200">
              Estamos listos para ayudarte con el mantenimiento y reparación de tus equipos industriales.
            </p>
          </div>
        </Container>
      </section>

      {/* Contacto principal */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div>
              <SectionTitle>Información de contacto</SectionTitle>

              <div className="space-y-6 mb-8">
                <Card>
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">📱</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
                      <p className="text-gray-600 mb-3">Nuestro canal preferido de atención</p>
                      <CTAWhatsApp
                        message="Hola UMEP, necesito información sobre sus servicios."
                        label="300 321 2328"
                      />
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">✉️</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email</h3>
                      <p className="text-gray-600">
                        <a
                          href="mailto:contacto.umep@gmail.com"
                          className="text-primary hover:underline"
                        >
                          contacto.umep@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">📍</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Ubicación</h3>
                      <p className="text-gray-600">
                        Cali, Valle del Cauca — Colombia
                        <br />
                        <span className="text-sm">Cobertura en todo el departamento</span>
                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">🕒</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Horario de atención</h3>
                      <p className="text-gray-600">
                        Lunes a Viernes: 8:00 AM - 6:00 PM
                        <br />
                        Sábados: 8:00 AM - 12:00 PM
                        <br />
                        <span className="text-sm text-gray-500">Atención de emergencias por WhatsApp</span>
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Redes sociales */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Síguenos</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/share/166ieRm1tF/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white p-3 rounded-full hover:opacity-90 transition-opacity"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/umep.co?igsh=aHVwdng1Nm00aGY3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white p-3 rounded-full hover:opacity-90 transition-opacity"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div>
              <LeadForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
