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
  return (
    <Menu as="div" className={cn("relative", className)}>
      <Menu.Button
        type="button"
        className="
          size-8 rounded-full hover:border hover:border-primary
          inline-flex items-center justify-center
          hover:text-primary hover:bg-accent
          cursor-pointer
        "
        aria-label="Open navigation menu"
      >
        <MenuIcon className="size-5 text-primary" aria-hidden="true" />
      </Menu.Button>

      <Menu.Items
        className="
          absolute right-0 mt-2 w-56
          rounded-lg border border-primary
          bg-background
          shadow-lg
          focus:outline-none
        "
      >
        <div className="py-2">
          {MenuItems.map((item) => (
            <Menu.Item key={item.href}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={[
                    "block px-4 py-2 text-sm",
                    active ? "bg-accent text-primary" : "",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}
