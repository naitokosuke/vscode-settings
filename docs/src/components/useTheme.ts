import { onMounted, ref, type Ref } from "vue";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "vscode-settings-docs:theme";
const inBrowser = typeof document !== "undefined";

const theme: Ref<Theme> = ref("system");

function apply(value: Theme): void {
  if (!inBrowser) return;
  const root = document.documentElement;
  if (value === "system") root.removeAttribute("data-theme");
  else root.dataset.theme = value;
}

export function useTheme(): {
  theme: Ref<Theme>;
  cycle: () => void;
} {
  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      theme.value = stored;
      apply(stored);
    }
  });

  const cycle = (): void => {
    const order: Theme[] = ["system", "light", "dark"];
    const next = order[(order.indexOf(theme.value) + 1) % order.length]!;
    theme.value = next;
    apply(next);
    if (inBrowser) localStorage.setItem(STORAGE_KEY, next);
  };

  return { theme, cycle };
}
