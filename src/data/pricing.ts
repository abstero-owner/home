export interface PricingTier {
  tier: string;
  priceMonthly: string;
  priceYearly: string;
  periodMonthly: string;
  periodYearly: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: 'solid' | 'ghost';
  featured: boolean;
  umamiEvent: string;
}

export const pricingTiers: PricingTier[] = [
  {
    tier: 'Standard Automation',
    priceMonthly: '$300–$600',
    priceYearly: '$3,000–$6,000',
    periodMonthly: '/ month',
    periodYearly: '/ year',
    description:
      'A proven automation adapted to your stack and your data — taking over the repetitive work most online businesses run into, live fast.',
    features: [
      'Proven automation built on our existing library',
      'Standard integrations with your existing tools',
      'Live in 7 days from kickoff',
      'Hosted, monitored, and maintained by us',
      'Email support with 24-hour response',
    ],
    ctaLabel: 'Get started',
    ctaHref: '/#contact?intent=pricing_get_started',
    ctaVariant: 'ghost',
    featured: false,
    umamiEvent: 'pricing_cta_get_started',
  },
  {
    tier: 'Custom Automation',
    priceMonthly: 'Deposit + retainer',
    priceYearly: 'Deposit + retainer',
    periodMonthly: '',
    periodYearly: '',
    description:
      'A tailored end-to-end automation built specifically for your unique business logic and edge cases.',
    features: [
      'Fully custom workflow built around your process',
      'Unlimited integrations with your stack',
      'Complex logic and AI steps',
      'Deposit to start, balance on go-live + monthly retainer',
      'Dedicated support & SLA',
      'Priority support with 4-hour response',
    ],
    ctaLabel: 'Talk to sales',
    ctaHref: '/#contact?intent=pricing_talk_to_sales',
    ctaVariant: 'solid',
    featured: true,
    umamiEvent: 'pricing_cta_talk_to_sales',
  },
];
