import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";

export default function Dashboard({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div>{children}</div>
    </ThemeProvider>
  );
}
