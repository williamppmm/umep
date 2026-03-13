interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

interface Window {
  gtag?: (command: 'event', eventName: string, params?: GtagEventParams) => void;
}
