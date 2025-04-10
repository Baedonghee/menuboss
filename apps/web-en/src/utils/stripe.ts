import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } = publicRuntimeConfig;

import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
};
