export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'When do I actually start paying?',
    answer:
      "It depends on the track. For a standard automation, nothing is due before it's live — no deposit, and no charge for the call, the plan, the build, or testing. If it never reaches live status, you owe nothing; your first charge is the monthly fee on go-live. Custom builds are different: they're weeks of work built only for you, so they start with a deposit, with the balance due on go-live, plus a monthly retainer after that. You'll know the full cost before any work begins.",
  },
  {
    question: "We don't have a developer or IT team. Is that a problem?",
    answer:
      "Not at all — that's exactly who we're built for. We handle every technical part: hosting, integrations, AI setup, monitoring, fixes. Your involvement is limited to telling us what needs automating and approving the plan. No setup, no configuration, no technical work on your side.",
  },
  {
    question: 'Can we cancel anytime?',
    answer:
      "Monthly plans — yes, cancel any time with no fees. Annual plans are paid upfront with a two-month discount, so they run for the full year. After the year ends, you can either renew, switch to monthly, or stop. For custom builds, the monthly fee is cancel-anytime just the same — the deposit and balance cover work already done, so they aren't refundable.",
  },
  {
    question: 'Who owns the data the flow processes?',
    answer:
      "You do. Always. Customer data, order data, anything the flow touches belongs to your business and stays in your systems (your CRM, your database, your tools). We don't store your data on our side beyond what's needed for the flow to run, and we don't use it for anything else.",
  },
  {
    question: 'How long does a flow take to go live?',
    answer:
      "Template flows: Up to 7 days from kickoff. Custom builds: usually 3-6 weeks depending on complexity and how many systems we're integrating. Discovery and planning happen in the first week regardless — you'll know the timeline before approving anything.",
  },
  {
    question: 'What happens if the flow breaks or makes a mistake?',
    answer:
      'Every flow goes through extensive testing before it goes live — real data, edge cases, unusual inputs, failure scenarios. After launch, we monitor every flow 24/7 and usually fix issues before you notice them.',
  },
];
