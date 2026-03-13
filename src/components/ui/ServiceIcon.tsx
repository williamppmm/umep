import React from 'react';

type ServiceIconSlug =
  | 'variadores-velocidad'
  | 'arrancadores-suaves'
  | 'plc-modulos'
  | 'hmi-pantallas'
  | 'balanzas-electronicas'
  | 'ultrasonidos-laboratorio'
  | 'fuentes-modulos';

interface ServiceIconProps {
  slug: string;
  size?: number;
  className?: string;
  'aria-hidden'?: boolean;
}

interface SvgIconProps {
  size: number;
  className?: string;
  'aria-hidden'?: boolean;
}

function VariadoresVelocidadIcon({
  size,
  className,
  'aria-hidden': ariaHidden = true,
}: SvgIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      className={className}
    >
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="4" width="44" height="56" rx="5" />
        <rect x="16" y="10" width="32" height="12" rx="2.5" />
        <path d="M22 13V19M22 16H26M26 13V19" />
        <path d="M30 14H36L30 18H36" />
        <circle cx="44" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="44" cy="18" r="1.2" fill="currentColor" stroke="none" opacity="0.45" />
        <rect x="17" y="28" width="12" height="10" rx="2" />
        <path d="M35 37C36.8 34.8 38.5 33.5 40.2 33.5C41.8 33.5 42.8 34.5 44 34.5C45.2 34.5 46.2 33.4 48 31.5" />
        <path d="M35 27.5H48" />
        <path d="M44.5 25.5L48 27.5L44.5 29.5" />
        <rect x="14" y="46" width="36" height="9" rx="2" />
        <line x1="20" y1="46" x2="20" y2="55" />
        <line x1="26" y1="46" x2="26" y2="55" />
        <line x1="32" y1="46" x2="32" y2="55" />
        <line x1="38" y1="46" x2="38" y2="55" />
        <line x1="44" y1="46" x2="44" y2="55" />
      </g>
    </svg>
  );
}

function ArrancadoresSuavesIcon({
  size,
  className,
  'aria-hidden': ariaHidden = true,
}: SvgIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      className={className}
    >
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="4" width="44" height="56" rx="5" />
        <rect x="16" y="10" width="32" height="12" rx="2.5" />
        <path d="M20 18C23 18 24 18 26 16C28 14 29 13 32 13C35 13 36 14 38 16C40 18 41 18 44 18" strokeWidth="1.8" />
        <circle cx="44" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
        <path d="M18 28H29" />
        <path d="M27 26L29 28L27 30" />
        <circle cx="22" cy="36" r="4.2" />
        <circle cx="32" cy="36" r="4.2" />
        <circle cx="42" cy="36" r="4.2" />
        <circle cx="22" cy="36" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="32" cy="36" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="42" cy="36" r="1.3" fill="currentColor" stroke="none" />
        <path d="M26.2 36H27.8" />
        <path d="M36.2 36H37.8" />
        <rect x="14" y="46" width="36" height="9" rx="2" />
        <line x1="20" y1="46" x2="20" y2="55" />
        <line x1="26" y1="46" x2="26" y2="55" />
        <line x1="32" y1="46" x2="32" y2="55" />
        <line x1="38" y1="46" x2="38" y2="55" />
        <line x1="44" y1="46" x2="44" y2="55" />
      </g>
    </svg>
  );
}

function PlcsModulosIcon({
  size,
  className,
  'aria-hidden': ariaHidden = true,
}: SvgIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      className={className}
    >
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="8" width="52" height="48" rx="4" />
        <rect x="10" y="14" width="12" height="36" rx="2" />
        <rect x="12.5" y="17" width="7" height="6" rx="1.5" strokeWidth="1.4" />
        <path d="M13.5 22H15V19.8H16.5V22H18" strokeWidth="1.2" />
        <circle cx="14.5" cy="29" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="33.5" r="1.2" fill="currentColor" stroke="none" opacity="0.45" />
        <path d="M14 43V48" strokeWidth="1.4" />
        <path d="M18 43V48" strokeWidth="1.4" />
        <rect x="25" y="14" width="10" height="36" rx="2" />
        <circle cx="30" cy="20" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="30" cy="24" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="30" cy="28" r="1.2" fill="currentColor" stroke="none" opacity="0.5" />
        <circle cx="30" cy="32" r="1.2" fill="currentColor" stroke="none" opacity="0.3" />
        <path d="M27 43V48" strokeWidth="1.4" />
        <path d="M31 43V48" strokeWidth="1.4" />
        <rect x="37" y="14" width="10" height="36" rx="2" />
        <circle cx="42" cy="20" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="42" cy="24" r="1.2" fill="currentColor" stroke="none" opacity="0.65" />
        <circle cx="42" cy="28" r="1.2" fill="currentColor" stroke="none" opacity="0.45" />
        <circle cx="42" cy="32" r="1.2" fill="currentColor" stroke="none" opacity="0.25" />
        <path d="M39 43V48" strokeWidth="1.4" />
        <path d="M43 43V48" strokeWidth="1.4" />
        <rect x="49" y="14" width="5" height="36" rx="1.8" opacity="0.55" />
        <circle cx="51.5" cy="20" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="51.5" cy="24" r="1.1" fill="currentColor" stroke="none" opacity="0.6" />
        <circle cx="51.5" cy="28" r="1.1" fill="currentColor" stroke="none" opacity="0.4" />
        <circle cx="51.5" cy="32" r="1.1" fill="currentColor" stroke="none" opacity="0.25" />
        <path d="M50.5 43V48" strokeWidth="1.4" opacity="0.6" />
        <path d="M53 43V48" strokeWidth="1.4" opacity="0.6" />
      </g>
    </svg>
  );
}

function HmisPantallasIcon({
  size,
  className,
  'aria-hidden': ariaHidden = true,
}: SvgIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      className={className}
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="72" height="48" rx="5" />
        <rect x="0.8" y="16" width="4.2" height="24" rx="2" />
        <rect x="75" y="16" width="4.2" height="24" rx="2" />
        <rect x="8" y="8" width="54" height="40" rx="3" />
        <path d="M12 30H18L21 23L25 34L29 22L33 30L37 26L41 29L45 20L49 30L53 26L58 28" strokeWidth="1.8" />
        <circle cx="14" cy="43.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="19" cy="43.5" r="1.2" fill="currentColor" stroke="none" opacity="0.5" />
        <circle cx="24" cy="43.5" r="1.2" fill="currentColor" stroke="none" opacity="0.25" />
        <circle cx="68" cy="18" r="2.6" strokeWidth="1.6" />
        <circle cx="68" cy="27.5" r="2.6" strokeWidth="1.6" />
        <circle cx="68" cy="37" r="2.6" strokeWidth="1.6" />
        <circle cx="57" cy="11" r="1.2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

function BalanzasElectronicasIcon({
  size,
  className,
  'aria-hidden': ariaHidden = true,
}: SvgIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      className={className}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="18" y="6" width="28" height="15" rx="3" strokeWidth="2.1" />
        <rect x="22" y="10" width="16" height="6" rx="1.5" strokeWidth="1.4" />
        <path d="M25 11.5V14.5" strokeWidth="1.3" />
        <path d="M25 11.5H28V14.5" strokeWidth="1.3" />
        <path d="M31 11.5H34V14.5H31" strokeWidth="1.3" />
        <circle cx="42.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
        <path d="M32 21V32" strokeWidth="2.1" />
        <path d="M27 32H37" strokeWidth="1.6" />
        <path d="M15.5 32H48.5C50.43 32 52 33.57 52 35.5C52 37.43 50.43 39 48.5 39H15.5C13.57 39 12 37.43 12 35.5C12 33.57 13.57 32 15.5 32Z" strokeWidth="2.1" />
        <path d="M13 40H51C52.66 40 54 41.34 54 43C54 44.66 52.66 46 51 46H13C11.34 46 10 44.66 10 43C10 41.34 11.34 40 13 40Z" strokeWidth="2.1" />
        <path d="M16 46L14.5 51" strokeWidth="2.1" />
        <path d="M48 46L49.5 51" strokeWidth="2.1" />
        <path d="M12.5 51H16.5" strokeWidth="2.1" />
        <path d="M47.5 51H51.5" strokeWidth="2.1" />
      </g>
    </svg>
  );
}

function UltrasonidosLaboratorioIcon({
  size,
  className,
  'aria-hidden': ariaHidden = true,
}: SvgIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      className={className}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="50" height="40" rx="4" strokeWidth="2" />
        <rect x="9" y="12" width="32" height="20" rx="2.5" strokeWidth="1.7" />
        <path d="M12 22C14 22 15 16 18 16C21 16 22 28 25 28C28 28 29 16 32 16C35 16 36 26 39 22" strokeWidth="1.8" />
        <circle cx="38" cy="14.5" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="13" cy="40" r="2.6" strokeWidth="1.5" />
        <circle cx="22" cy="40" r="2.6" strokeWidth="1.5" />
        <rect x="31" y="37" width="8" height="6" rx="1.5" strokeWidth="1.4" />
        <path d="M54 22C59 22 59.21 32.89 54 32.89" strokeWidth="1.7" />
        <path d="M61 18L67 20V34L61 36V18Z" strokeWidth="1.7" />
        <path d="M67 22L71 24V30L67 32" strokeWidth="1.5" />
        <path d="M72 24.5C74 26.17 74 27.83 72 29.5" strokeWidth="1.3" opacity="0.8" />
        <path d="M74 22.5C76.67 25.5 76.67 28.5 74 31.5" strokeWidth="1.1" opacity="0.5" />
      </g>
    </svg>
  );
}

function FuentesModulosIcon({
  size,
  className,
  'aria-hidden': ariaHidden = true,
}: SvgIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      className={className}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="4" width="40" height="56" rx="4" strokeWidth="2" />
        <path d="M18 4V2H46V4" strokeWidth="1.5" />
        <path d="M18 60V62H46V60" strokeWidth="1.5" />
        <rect x="16" y="8" width="32" height="10" rx="2" strokeWidth="1.4" />
        <path d="M22 13C23.5 10.8 25.5 10.8 27 13C28.5 15.2 30.5 15.2 32 13" strokeWidth="1.5" />
        <rect x="17" y="22" width="6" height="6" rx="1" strokeWidth="1.3" />
        <rect x="25" y="22" width="6" height="6" rx="1" strokeWidth="1.3" />
        <rect x="33" y="22" width="6" height="6" rx="1" strokeWidth="1.3" />
        <path d="M16 34H48" strokeWidth="1.1" opacity="0.4" />
        <rect x="18" y="38" width="8" height="6" rx="1" strokeWidth="1.4" />
        <rect x="28" y="38" width="8" height="6" rx="1" strokeWidth="1.4" />
        <path d="M22 39.5V42.5" strokeWidth="1.2" />
        <path d="M20.5 41H23.5" strokeWidth="1.2" />
        <path d="M30.5 41H33.5" strokeWidth="1.4" />
        <circle cx="44" cy="39.5" r="1.8" fill="currentColor" stroke="none" />
        <circle cx="44" cy="44.5" r="1.8" fill="currentColor" stroke="none" opacity="0.35" />
        <circle cx="24" cy="52" r="4.5" strokeWidth="1.5" />
        <circle cx="24" cy="52" r="1.6" fill="currentColor" stroke="none" opacity="0.35" />
        <path d="M24 47.5V49" strokeWidth="1.4" />
        <rect x="36" y="49" width="10" height="7" rx="1.5" strokeWidth="1.3" />
        <path d="M41 49V56" strokeWidth="1.2" />
        <line x1="44.23" y1="22.15" x2="44.23" y2="25.15" strokeWidth="1.2" />
        <line x1="41.73" y1="25.15" x2="46.73" y2="25.15" strokeWidth="1.4" />
        <line x1="42.73" y1="26.65" x2="45.73" y2="26.65" strokeWidth="1.2" />
        <line x1="43.73" y1="28.15" x2="44.73" y2="28.15" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

const serviceIconMap: Record<ServiceIconSlug, React.ComponentType<SvgIconProps>> = {
  'variadores-velocidad': VariadoresVelocidadIcon,
  'arrancadores-suaves': ArrancadoresSuavesIcon,
  'plc-modulos': PlcsModulosIcon,
  'hmi-pantallas': HmisPantallasIcon,
  'balanzas-electronicas': BalanzasElectronicasIcon,
  'ultrasonidos-laboratorio': UltrasonidosLaboratorioIcon,
  'fuentes-modulos': FuentesModulosIcon,
};

export default function ServiceIcon({
  slug,
  size = 48,
  className,
  'aria-hidden': ariaHidden = true,
}: ServiceIconProps) {
  const Component = serviceIconMap[slug as ServiceIconSlug];

  if (!Component) {
    return null;
  }

  return <Component size={size} className={className} aria-hidden={ariaHidden} />;
}
