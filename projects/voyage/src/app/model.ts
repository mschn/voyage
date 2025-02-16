import { Message } from 'ngx-voyage';

export const API_URL = `http://${window.location.host}/api`;

export function isMessage(m: any): m is Message {
  return m?.text && m?.type;
}
