import { enUS, fr, Locale } from 'date-fns/locale';
import { messages as messagesEn, Messages } from './en';
import { messages as messagesFr } from './fr';

export function getMessages(): Messages {
  switch (navigator.language) {
    case 'fr':
      return messagesFr;
    default:
      return messagesEn;
  }
}

export function getDateFnsLocale(): Locale {
  switch (navigator.language) {
    case 'fr':
      return fr;
    default:
      return enUS;
  }
}
