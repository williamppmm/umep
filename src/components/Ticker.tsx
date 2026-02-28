const ITEMS = [
  'Variadores de velocidad',
  'Mantenimiento preventivo',
  'electrónica de consumo',
  'Fuentes de poder y UPS',
  'Redes y conectividad',
  'Equipos industriales',
  'Garantía de 90 días',
  'Variadores de frecuencia',
  'Atención en el Valle del Cauca',
];

const doubled = [...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div className="overflow-hidden border-y border-umep-border bg-white py-3" aria-hidden>
      <div className="inline-flex min-w-max whitespace-nowrap animate-ticker">
        {doubled.map((text, i) => (
          <div
            key={`${text}-${i}`}
            className="flex items-center gap-4 px-8 text-xs font-medium uppercase tracking-widest text-umep-text"
          >
            <span className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
