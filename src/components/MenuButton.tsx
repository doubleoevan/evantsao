import * as React from "react";
import { cn, isPathActive } from "../lib/utils";
import { Menu, MenuItem, MenuItems } from "@headlessui/react";
import { Menu as MenuIcon } from "lucide-react";
import { MENU_ITEMS } from "../config/menu";

export function MenuButton({ pathname, className }: { pathname: string; className?: string }) {
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

      <MenuItems
        anchor="bottom end"
        transition
        className="
          z-50 mt-2 w-48
          rounded-lg border border-primary shadow-lg focus:outline-none
          origin-top-right transition duration-150 ease-out
          bg-background
        "
      >
        <>
          {MENU_ITEMS.map((item) => {
            const isActive = isPathActive(pathname, item.href);
            return (
              <MenuItem key={item.href}>
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
              </MenuItem>
            );
          })}
        </>
      </MenuItems>
    </Menu>
  );
}
