import Image from 'next/image';
import Container from './ui/Container';

const clients = [
  {
    name: 'Ascensores Confort Cali S.A.S.',
    industry: 'Ascensores y elevadores',
    service: 'Mantenimiento de equipos electronicos',
    quote:
      'El equipo de UMEP demostro conocimiento tecnico solido y compromiso real con el tiempo de respuesta. Nuestros equipos quedaron operando en optimas condiciones.',
    instagram: 'https://www.instagram.com/ascensores_confort_cali/',
    contactArea: 'Area de mantenimiento',
    location: 'Cali, Colombia',
    logo: '/images/clients/ascensores_confort.png',
    logoAlt: 'Logo de Ascensores Confort Cali S.A.S.',
    accentClass: 'from-[#4aa8e8] via-[#2f87d2] to-[#10131d]',
    glow: '0 16px 36px rgba(47, 135, 210, 0.16)',
    logoShellClass: 'border-[#4aa8e8]/30 bg-[#4aa8e8]/[0.08]',
    serviceClass: 'bg-[#4aa8e8]/10 text-[#1f6fb8]',
  },
  {
    name: 'Fora S.A.S.',
    industry: 'Fabricacion y venta de muebles',
    service: 'Reparacion de equipos electronicos',
    quote:
      'Rapidos, confiables y muy profesionales. UMEP entendio la urgencia de nuestra operacion y entrego resultados que superaron nuestras expectativas.',
    instagram: 'https://www.instagram.com/foradesign',
    contactArea: 'Area de produccion',
    location: 'Cali, Colombia',
    logo: '/images/clients/fora.png',
    logoAlt: 'Logo de Fora S.A.S.',
    accentClass: 'from-[#8ba79a] via-[#88a295] to-[#6f8f81]',
    glow: '0 16px 36px rgba(139, 167, 154, 0.18)',
    logoShellClass: 'border-[#8ba79a]/35 bg-[#8ba79a]/[0.12]',
    serviceClass: 'bg-[#8ba79a]/12 text-[#5f7e70]',
  },
  {
    name: 'Homega Colombia S.A.S.',
    industry: 'Acabados y articulos para el hogar',
    service: 'Mantenimiento de equipos electronicos',
    quote:
      'UMEP nos brindo un servicio agil y de alta calidad. Sus tecnicos identificaron el problema rapidamente y mantuvieron nuestros equipos operando sin interrumpir la operacion.',
    instagram: 'https://www.instagram.com/homega_colombia/',
    contactArea: 'Area administrativa',
    location: 'Yumbo, Valle del Cauca',
    logo: '/images/clients/homega.png',
    logoAlt: 'Logo de Homega Colombia S.A.S.',
    accentClass: 'from-[#00386d] via-[#004781] to-[#f5b100]',
    glow: '0 16px 36px rgba(0, 56, 109, 0.18)',
    logoShellClass: 'border-[#f5b100]/35 bg-[#00386d]/[0.06]',
    serviceClass: 'bg-[#f5b100]/12 text-[#9d6800]',
  },
];

export default function ClientsShowcase() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,197,66,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(26,58,110,0.10),_transparent_32%)]" />
      <Container>
        <div className="relative">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Clientes que confian en UMEP
            </span>
            <h2 className="mt-5 text-3xl font-bold text-umep-text md:text-4xl">
              Empresas que ya nos han confiado sus equipos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Compartimos referencias aprobadas por clientes que ya confian en
              UMEP. Los logos y comentarios publicados cuentan con autorizacion
              expresa de cada empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {clients.map((client) => (
              <article
                key={client.name}
                className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white p-7 shadow-[0_10px_30px_rgba(11,19,32,0.08)] transition-all duration-300 hover:-translate-y-1.5"
                style={{ boxShadow: client.glow }}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${client.accentClass}`}
                />
                <div className="absolute right-5 top-5 text-6xl font-serif leading-none text-primary/10">
                  &quot;
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div
                      className={`absolute inset-0 rounded-2xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 ${client.serviceClass}`}
                    />
                    <div
                      className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border p-2 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-lg ${client.logoShellClass}`}
                    >
                    <Image
                      src={client.logo}
                      alt={client.logoAlt}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-umep-text">
                      {client.name}
                    </h3>
                    <p className="mt-1 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {client.industry}
                    </p>
                  </div>
                </div>

                <p
                  className={`mt-6 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] ${client.serviceClass}`}
                >
                  {client.service}
                </p>

                <div className="mt-5 rounded-2xl border border-dashed border-primary/15 bg-primary/[0.03] p-4">
                  <p className="text-sm leading-7 text-gray-600">
                    {client.quote}
                  </p>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  <p>Quieres saber mas sobre {client.name}?</p>
                  <a
                    href={client.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center font-semibold text-primary transition-colors duration-200 hover:text-accent"
                  >
                    Ver su Instagram
                  </a>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4 border-t border-umep-border pt-5">
                  <div className="text-sm text-gray-500">
                    <p className="font-medium text-umep-text">{client.contactArea}</p>
                    <p>{client.location}</p>
                  </div>
                  <div className="text-sm font-semibold text-accent">
                    5/5
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-primary/10 bg-primary/[0.04] px-5 py-4 text-center text-sm leading-6 text-gray-600">
            Los logotipos mostrados se usan con autorizacion expresa de cada
            cliente. Su publicacion busca respaldar la experiencia de UMEP y no
            implica patrocinio ni afiliacion comercial.
          </div>
        </div>
      </Container>
    </section>
  );
}
