export interface NavItem {
  label: string;
  href: string;
  mobileOnly?: boolean;
}

export const mainNavItems: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

export const mobileNavItems: NavItem[] = [
  ...mainNavItems,
  { label: 'Contact', href: '/contact', mobileOnly: true },
];

export const ctaNav = {
  label: 'START A PROJECT',
  href: '/contact',
} as const;
