export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "Popular",
    href: "/popular",
  },
  {
    label: "Latest",
    href: "/latest",
  },
  {
    label: "About",
    href: "/about",
  },
];
