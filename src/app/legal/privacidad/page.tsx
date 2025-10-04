import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad y tratamiento de datos personales de UMEP.',
};

export default function PrivacidadPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-600 text-white py-16">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Política de Privacidad
          </h1>
          <p className="text-xl text-gray-200">
            Última actualización: Octubre 2025
          </p>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card className="prose prose-lg max-w-none">
              <h2>1. Información general</h2>
              <p>
                UMEP (Unidad de Mantenimiento Electrónico Profesional), identificada con RUT 1061719973-1,
                se compromete a proteger la privacidad de los datos personales de nuestros clientes y usuarios
                de acuerdo con la legislación colombiana vigente, especialmente la Ley 1581 de 2012 y el Decreto 1377 de 2013.
              </p>

              <h2>2. Datos que recopilamos</h2>
              <p>
                Cuando utiliza nuestro formulario de contacto o nos escribe por WhatsApp/correo electrónico,
                podemos recopilar la siguiente información:
              </p>
              <ul>
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Ciudad de ubicación</li>
                <li>Información sobre equipos y necesidades técnicas</li>
              </ul>

              <h2>3. Finalidad del tratamiento</h2>
              <p>
                Los datos personales que recopilamos son utilizados exclusivamente para:
              </p>
              <ul>
                <li>Responder a sus consultas y solicitudes de servicio</li>
                <li>Elaborar cotizaciones y presupuestos</li>
                <li>Coordinar visitas técnicas y servicios</li>
                <li>Enviar información sobre nuestros servicios y productos (solo si lo autoriza)</li>
                <li>Cumplir con obligaciones legales y contractuales</li>
              </ul>

              <h2>4. Conservación de datos</h2>
              <p>
                Sus datos personales serán conservados durante el tiempo necesario para cumplir con las finalidades
                descritas y de acuerdo con los plazos legales establecidos. Actualmente, los datos enviados por
                formulario son recibidos directamente en nuestro correo electrónico y no se almacenan en bases de
                datos automatizadas.
              </p>

              <h2>5. Derechos del titular</h2>
              <p>
                Como titular de sus datos personales, usted tiene derecho a:
              </p>
              <ul>
                <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales</li>
                <li><strong>Solicitar prueba</strong> de la autorización otorgada</li>
                <li><strong>Ser informado</strong> sobre el uso dado a sus datos</li>
                <li><strong>Revocar la autorización</strong> y/o solicitar la supresión del dato cuando no exista
                    obligación legal o contractual de conservarlo</li>
                <li><strong>Acceder gratuitamente</strong> a sus datos personales</li>
              </ul>

              <h2>6. Ejercicio de derechos (ARCO)</h2>
              <p>
                Para ejercer sus derechos de Acceso, Rectificación, Cancelación u Oposición (derechos ARCO),
                puede contactarnos en:
              </p>
              <ul>
                <li>Email: <a href="mailto:contacto.umep@gmail.com" className="text-primary hover:underline">contacto.umep@gmail.com</a></li>
                <li>WhatsApp: <a href="https://wa.me/573003212328" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">300 321 2328</a></li>
              </ul>
              <p>
                Responderemos su solicitud en un plazo máximo de 15 días hábiles.
              </p>

              <h2>7. Seguridad de la información</h2>
              <p>
                UMEP implementa medidas de seguridad técnicas y administrativas razonables para proteger
                sus datos personales contra pérdida, uso indebido o acceso no autorizado. Sin embargo,
                ninguna transmisión por Internet es 100% segura.
              </p>

              <h2>8. Compartir información con terceros</h2>
              <p>
                No compartimos, vendemos ni alquilamos su información personal a terceros con fines comerciales.
                Solo podemos compartir datos cuando:
              </p>
              <ul>
                <li>Usted nos autorice expresamente</li>
                <li>Sea requerido por autoridades legales competentes</li>
                <li>Sea necesario para prestar el servicio contratado (ej: proveedores de repuestos)</li>
              </ul>

              <h2>9. Cookies y tecnologías similares</h2>
              <p>
                Nuestro sitio web puede utilizar cookies y tecnologías similares (Google Analytics) para
                mejorar la experiencia del usuario y analizar el tráfico del sitio. Estas herramientas
                recopilan información de forma anónima y agregada.
              </p>

              <h2>10. Cambios a esta política</h2>
              <p>
                Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento.
                Los cambios serán publicados en esta página con la fecha de actualización correspondiente.
              </p>

              <h2>11. Contacto</h2>
              <p>
                Si tiene preguntas sobre esta Política de Privacidad o sobre el tratamiento de sus datos
                personales, puede contactarnos en:
              </p>
              <div className="bg-gray-50 p-6 rounded-xl mt-4">
                <p className="mb-2"><strong>UMEP - Unidad de Mantenimiento Electrónico Profesional</strong></p>
                <p className="mb-2">RUT: 1061719973-1</p>
                <p className="mb-2">Email: contacto.umep@gmail.com</p>
                <p className="mb-2">WhatsApp: 300 321 2328</p>
                <p>Cali, Valle del Cauca — Colombia</p>
              </div>

              <div className="mt-8 text-sm text-gray-600">
                <p>
                  Esta política cumple con la Ley 1581 de 2012 (Protección de Datos Personales), Decreto 1377 de 2013
                  y demás normativa aplicable en Colombia.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
