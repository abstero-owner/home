export interface Integration {
  name: string;
  displayName: string;
  icon: string;
  href: string;
}

/** Integration logos shown in the hero logos strip */
export const heroIntegrations: Integration[] = [
  { name: 'notion', displayName: 'Notion', icon: 'notion.svg', href: 'https://www.notion.so/' },
  { name: 'slack', displayName: 'Slack', icon: 'slack.svg', href: 'https://slack.com/' },
  { name: 'telegram', displayName: 'Telegram', icon: 'telegram.svg', href: 'https://telegram.org/' },
  { name: 'shopify', displayName: 'Shopify', icon: 'shopify.svg', href: 'https://www.shopify.com/' },
  { name: 'gmail', displayName: 'Gmail', icon: 'google-gmail.svg', href: 'https://www.google.com/gmail/' },
  { name: 'mailchimp', displayName: 'Mailchimp', icon: 'mailchimp-freddie.svg', href: 'https://mailchimp.com/' },
  { name: 'google-sheets', displayName: 'Google Sheets', icon: 'google-sheets.svg', href: 'https://www.google.com/sheets/about/' },
  { name: 'airtable', displayName: 'Airtable', icon: 'airtable.svg', href: 'https://airtable.com/' },
];

/** All integration icon filenames — used for mapping in flow cards */
export const integrationIcons: Record<string, string> = {
  'Gmail': 'google-gmail.svg',
  'Google Sheets': 'google-sheets.svg',
  'Slack': 'slack.svg',
  'Notion': 'notion.svg',
  'Shopify': 'shopify.svg',
  'Telegram': 'telegram.svg',
  'HubSpot': 'hubspot.svg',
  'Mailchimp': 'mailchimp-freddie.svg',
  'OpenAI': 'openai.svg',
  'Airtable': 'airtable.svg',
  'Stripe': 'stripe.svg',
  'PayPal': 'paypal.svg',
  'Jira': 'jira.svg',
  'Mailgun': 'mailgun.svg',
  'Anthropic': 'anthropic-icon.svg',
};
