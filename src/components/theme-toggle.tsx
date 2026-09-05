import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Small sun/moon switch. The theme class is applied to <html> by an inline
 * script before hydration, so this button only flips the class and stores the
 * choice — it renders identically on server and client (icons cross-fade with
 * CSS, never with state).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    try {
      localStorage.setItem("ab-theme", next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light or dark theme"
      title="Toggle light or dark theme"
      className={cn(
        "relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-ink-soft transition-colors hover:border-accent hover:text-accent",
        className,
      )}
    >
      <Sun
        aria-hidden
        className="absolute h-4 w-4 rotate-0 scale-100 opacity-100 transition-all duration-300 dark:-rotate-90 dark:scale-75 dark:opacity-0"
      />
      <Moon
        aria-hidden
        className="absolute h-4 w-4 rotate-90 scale-75 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  );
}
