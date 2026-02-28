import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import LeadForm from '@/components/LeadForm';
import CTAWhatsApp from '@/components/CTAWhatsApp';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import { contactInfo, siteConfig, socialLinks } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Contacto - UMEP',
  description: `Contáctanos para servicios de mantenimiento y reparación industrial en ${contactInfo.region}. WhatsApp: ${contactInfo.whatsappDisplay}`,
  alternates: {
    canonical: `${siteConfig.url}/contacto`,
  },
};

export default function ContactoPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-600 text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contáctanos</h1>
            <p className="text-xl text-gray-200">
              Estamos listos para ayudarte con el mantenimiento y reparación de
              tus equipos industriales.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionTitle>Información de contacto</SectionTitle>

              <div className="space-y-6 mb-8">
                <Card>
                  <div className="flex items-start space-x-4">
                    <Icon name="phone" size={32} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
                      <p className="text-gray-600 mb-3">
                        Nuestro canal preferido de atención
                      </p>
                      <CTAWhatsApp
                        message="Hola UMEP, necesito información sobre sus servicios."
                        label={contactInfo.whatsappDisplay}
                      />
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start space-x-4">
                    <Icon name="mail" size={32} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email</h3>
                      <p className="text-gray-600">
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-primary hover:underline"
                        >
                          {contactInfo.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start space-x-4">
                    <Icon name="mapPin" size={32} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Ubicación</h3>
                      <p className="text-gray-600">
                        {contactInfo.city}, {contactInfo.region} -{' '}
                        {contactInfo.country}
                        <br />
                        <span className="text-sm">
                          Cobertura en todo el departamento
                        </span>
                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start space-x-4">
                    <Icon name="clock" size={32} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Horario de atención
                      </h3>
                      <p className="text-gray-600">
                        Lunes a Viernes: 8:00 AM - 6:00 PM
                        <br />
                        Sábados: 8:00 AM - 12:00 PM
                        <br />
                        <span className="text-sm text-gray-500">
                          Atención de emergencias por WhatsApp
                        </span>
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Síguenos</h3>
                <div className="flex space-x-4">
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1877F2] text-white p-3 rounded-full hover:opacity-90 transition-opacity"
                    aria-label="Facebook"
                    style={{ boxShadow: '0 3px 12px rgba(24,119,242,0.35)' }}
                  >
                    <Icon name="facebook" size={24} aria-hidden />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white p-3 rounded-full hover:opacity-90 transition-opacity"
                    aria-label="Instagram"
                    style={{
                      background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                      boxShadow: '0 3px 12px rgba(193,53,132,0.35)',
                    }}
                  >
                    <Icon name="instagram" size={24} aria-hidden />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <LeadForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
