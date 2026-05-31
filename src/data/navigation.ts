export interface NavItem {
  label: string;
  href: string;
}

/** Main navigation items — used in Header, MobileMenu, Footer */
export const navItems: NavItem[] = [
  { label: 'What we automate', href: '/#how' },
  { label: 'How it works', href: '/#process' },
  { label: 'Flows', href: '/flows/' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];
