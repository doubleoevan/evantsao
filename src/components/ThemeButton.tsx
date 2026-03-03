import * as React from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function saveTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}

export function ThemeButton() {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>("light"); // stable SSR

  React.useEffect(() => {
    setTheme(getTheme());
    setMounted(true);
  }, []);

  function switchTheme() {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    saveTheme(newTheme);
    setTheme(newTheme);
  }

  return (
    <button
      type="button"
      className="
        size-8 rounded-full border border-primary
        inline-flex items-center justify-center
        hover:text-primary hover:bg-accent
        cursor-pointer
      "
      onClick={switchTheme}
      aria-label="Switch theme"
    >
      {/* SSR + first client render are stable; after mount it corrects */}
      {mounted && theme === "dark" ? (
        <Moon className="size-5 text-primary" stroke="currentColor" aria-hidden="true" />
      ) : (
        <Sun className="size-5 text-primary" fill="currentColor" aria-hidden="true" />
      )}
    </button>
  );
}
