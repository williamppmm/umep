import React from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react';
import {
  BadgeDollarSign,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Coins,
  Cpu,
  Heart,
  Mail,
  MapPin,
  Microscope,
  Monitor,
  Package,
  Phone,
  Plug,
  Scale,
  ShieldCheck,
  Smartphone,
  Timer,
  Wrench,
  Zap,
} from 'lucide-react';

const iconMap = {
  zap: Zap,
  wrench: Wrench,
  cpu: Cpu,
  monitor: Monitor,
  smartphone: Smartphone,
  scale: Scale,
  microscope: Microscope,
  plug: Plug,
  shieldCheck: ShieldCheck,
  mapPin: MapPin,
  clock: Clock3,
  timer: Timer,
  clipboard: ClipboardList,
  phone: Phone,
  mail: Mail,
  package: Package,
  coins: Coins,
  badgeDollar: BadgeDollarSign,
  checkCircle: CheckCircle2,
  check: Check,
  heart: Heart,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export default function Icon({
  name,
  size = 24,
  strokeWidth = 1.75,
  className,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  ...props
}: IconProps) {
  const Component = iconMap[name];

  if (!Component) {
    return null;
  }

  const computedAriaHidden = ariaHidden ?? (ariaLabel ? undefined : true);

  return (
    <Component
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={computedAriaHidden}
      {...props}
    />
  );
}
