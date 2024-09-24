import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";

export default function Dashboard({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
