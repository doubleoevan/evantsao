import { cn } from "../lib/utils";
import type { ReactNode } from "react";

interface Props {
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  children: ReactNode;
}

export function Link({ href, target, rel, className, children }: Props) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        `
          relative inline-block
          after:absolute after:left-0 after:bottom-0
          after:h-0.5 after:w-0 after:bg-primary
          after:transition-all after:duration-300
          hover:after:w-full hover:text-primary
        `,
        className,
      )}
    >
      {children}
    </a>
  );
}
