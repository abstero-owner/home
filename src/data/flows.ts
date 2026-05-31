export interface FlowIntegration {
  name: string;
  icon: string;
}

export interface FlowChip {
  label: string;
}

export interface FlowCard {
  slug: string;
  title: string;
  category: 'Customer Operations' | 'Data & Reporting' | 'Sales Operations';
  tier: 'standard' | 'custom';
  metric: string;
  description: string;
  integrations: FlowIntegration[];
  chips?: FlowChip[];
  umamiEvent: string;
  hasDetailPage: boolean;
}

export const flowCategories = [
  'Customer Operations',
  'Data & Reporting',
  'Sales Operations',
] as const;

export const flows: FlowCard[] = [
  {
    slug: 'read-invoices-accounting',
    title: 'Read invoices → accounting',
    category: 'Customer Operations',
    tier: 'standard',
    metric: '~8 hrs/week saved',
    description:
      'Invoices from email get extracted, matched to vendors, and posted to your books — no one opening PDFs manually.',
    integrations: [
      { name: 'Gmail', icon: 'google-gmail.svg' },
      { name: 'Google Sheets', icon: 'google-sheets.svg' },
    ],
    chips: [{ label: 'Xero / QuickBooks' }],
    umamiEvent: 'flow_card_read_invoices_accounting',
    hasDetailPage: false,
  },
  {
    slug: 'reply-customer-questions',
    title: 'Reply to customer questions',
    category: 'Customer Operations',
    tier: 'standard',
    metric: '~12 hrs/week saved',
    description:
      'Incoming support emails and chat messages get answered from your docs and order data — escalates only when it should.',
    integrations: [
      { name: 'Gmail', icon: 'google-gmail.svg' },
      { name: 'Slack', icon: 'slack.svg' },
      { name: 'Notion', icon: 'notion.svg' },
      { name: 'Shopify', icon: 'shopify.svg' },
    ],
    umamiEvent: 'flow_card_reply_customer_questions',
    hasDetailPage: false,
  },
  {
    slug: 'daily-sales-summary',
    title: 'Send daily sales summary',
    category: 'Data & Reporting',
    tier: 'standard',
    metric: '~3 hrs/week saved',
    description:
      "Yesterday's revenue, top SKUs, and refund rate — compiled and delivered to Slack or email every morning.",
    integrations: [
      { name: 'Shopify', icon: 'shopify.svg' },
      { name: 'Google Sheets', icon: 'google-sheets.svg' },
      { name: 'Slack', icon: 'slack.svg' },
    ],
    umamiEvent: 'flow_card_daily_sales_summary',
    hasDetailPage: false,
  },
  {
    slug: 'low-stock-alert',
    title: 'Alert when stock runs low',
    category: 'Data & Reporting',
    tier: 'standard',
    metric: '~2 hrs/week saved',
    description:
      'Inventory drops below your threshold — your ops team gets a ping with SKU, current count, and reorder link.',
    integrations: [
      { name: 'Shopify', icon: 'shopify.svg' },
      { name: 'Slack', icon: 'slack.svg' },
      { name: 'Telegram', icon: 'telegram.svg' },
    ],
    umamiEvent: 'flow_card_low_stock_alert',
    hasDetailPage: false,
  },
  {
    slug: 'sort-leads-priority',
    title: 'Sort new leads by priority',
    category: 'Sales Operations',
    tier: 'standard',
    metric: '~5 hrs/week saved',
    description:
      'New form fills and inbound leads get scored, tagged, and routed to the right rep — no spreadsheet triage.',
    integrations: [
      { name: 'HubSpot', icon: 'hubspot.svg' },
      { name: 'Google Sheets', icon: 'google-sheets.svg' },
      { name: 'Slack', icon: 'slack.svg' },
    ],
    umamiEvent: 'flow_card_sort_leads_priority',
    hasDetailPage: true,
  },
  {
    slug: 'cold-email-pipeline',
    title: 'Cold email pipeline',
    category: 'Sales Operations',
    tier: 'custom',
    metric: '~15 hrs/week saved',
    description:
      'Personalized outbound at scale — research, draft, send, and tag replies so your team only talks to people who responded.',
    integrations: [
      { name: 'HubSpot', icon: 'hubspot.svg' },
      { name: 'Mailchimp', icon: 'mailchimp-freddie.svg' },
      { name: 'OpenAI', icon: 'openai.svg' },
    ],
    umamiEvent: 'flow_card_cold_email_pipeline',
    hasDetailPage: false,
  },
];
