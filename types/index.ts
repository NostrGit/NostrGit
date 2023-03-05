export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type HeaderConfig = {
  mainNav: MainNavItem[];
};
