import * as React from "react";
import { cn } from "../lib/utils";
import { Menu } from "@headlessui/react";
import { Menu as MenuIcon } from "lucide-react";

type MenuItem = { href: string; label: string };

const MenuItems: MenuItem[] = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/music", label: "Music" },
  { href: "/improv", label: "Improv" },
  { href: "/technology", label: "Technology" },
];

export function MenuButton({ className }: { className?: string }) {
  const [pathname, setPathname] = React.useState("");

  React.useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <Menu as="div" className={cn("relative", className)}>
      <Menu.Button
        type="button"
        className="
          size-8 rounded-full
          border border-transparent
          hover:border-primary
          inline-flex items-center justify-center
          hover:text-primary hover:bg-accent
          focus:outline-none
          cursor-pointer
        "
        aria-label="Open navigation menu"
      >
        <MenuIcon className="size-5 text-primary" aria-hidden="true" />
      </Menu.Button>

      <Menu.Items
        anchor="bottom end"
        transition
        className="
          z-50 mt-2 w-48
          rounded-lg border border-primary shadow-lg focus:outline-none
          origin-top-right transition duration-150 ease-out
        "
      >
        <>
          {MenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Menu.Item key={item.href}>
                {({ focus }) => (
                  <a
                    href={item.href}
                    className={cn(
                      "block p-2 text-sm",
                      isActive && "bg-accent text-primary",
                      focus && "bg-accent text-primary",
                    )}
                  >
                    {item.label}
                  </a>
                )}
              </Menu.Item>
            );
          })}
        </>
      </Menu.Items>
    </Menu>
  );
}
