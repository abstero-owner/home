export interface Step {
  num: string;
  title: string;
  description: string;
}

/** "What we automate" section — 3 pillars */
export const steps: Step[] = [
  {
    num: '01',
    title: 'Customer Operations',
    description:
      'We build you a customer support agent that takes no breaks, no days off, never burns out — and knows your product down to the smallest detail. And we are talking about more than FAQ replies: it talks to your carrier APIs, updates your CRM, processes returns, and escalates to humans only when it actually needs to.',
  },
  {
    num: '02',
    title: 'Data & Reporting',
    description:
      "Want a daily digest of your top-selling products, yesterday's transaction history, or a news summary on the topics you care about — delivered at 7am? We build it. Tell us what data matters, where you read it (Slack, email, Google Sheets, Notion), and when — we handle the rest.",
  },
  {
    num: '03',
    title: 'Sales Operations',
    description:
      "Sending cold emails takes half your week? We build the full pipeline — AI writes personalized openers based on the prospect's company, recent news, or LinkedIn activity, sends them on schedule, and auto-tags replies in your CRM as interested, not now, wrong person, or unsubscribe. You only see the ones worth a real conversation.",
  },
];
