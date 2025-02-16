export interface Message {
  text: string;
  type: 'info' | 'warn' | 'error';
}

export function isMessage(m: any): m is Message {
  return m?.text && m?.type;
}
