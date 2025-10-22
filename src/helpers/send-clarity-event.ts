import { clarity } from 'react-microsoft-clarity';

export const namePages = {
  front: 'front',
  upsell1: 'upsell-1',
  upsell2: 'upsell-2',
  dws1: 'dws-1',
  dws2: 'dws-2',
  thankYou: 'thank-you',
}

export const sendClarityEvent = (page: string, message?: string) => {

  const messageStep = message
    ? `${page}-${message}`
    : `${page}`

  if (clarity.hasStarted()) {
    clarity.setEvent(messageStep)
  }
};
