export type MenuItem = {
  href: string;
  label: string;
};

export const MENU_ITEMS: MenuItem[] = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/music", label: "Music" },
  { href: "/improv", label: "Improv" },
  { href: "/technology", label: "Technology" },
];
