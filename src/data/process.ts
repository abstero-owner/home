export interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

/** "How it works" sticky-stack process cards */
export const processSteps: ProcessStep[] = [
  {
    num: '01',
    title: 'Intro Call',
    description:
      "We start with a 30-minute call where you tell us what's eating your team's time. We ask questions, answer yours, and if your problem matches a flow we've already built — we'll show you a live demo right there.",
  },
  {
    num: '02',
    title: 'Discovery & Plan',
    description:
      "We look into the tools you already use, study how the broken process currently works, and put together a concrete plan: what we'll build, how it will connect to your stack, what it will do. You review it and approve it before we move forward.",
  },
  {
    num: '03',
    title: 'Build',
    description:
      "We build the flow according to the approved plan. You don't install anything, configure anything, or have a developer on your side. We work with the tools and accounts you already have.",
  },
  {
    num: '04',
    title: 'Deploy & Test',
    description:
      "We deploy the flow, run it on your real data, and hunt for the edge cases that always show up — unusual orders, weird inputs, formats nobody anticipated. Everything gets fixed before your team or customers touch it.",
  },
  {
    num: '05',
    title: 'Go Live',
    description:
      "The flow goes live and starts doing the work. This is the first day you pay us anything — never for the call, never for the plan, never for testing. For a standard automation, this is the first day you pay anything — never for the call, the plan, or testing — just the monthly fee, starting when your flow handles its first real task. Custom builds work differently: they start with a deposit, and the balance is due on go-live, followed by a monthly retainer. Either way, you know the full cost before any work begins.",
  },
];
