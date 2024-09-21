import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import Footer from "@/components/footer";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kussa",
  description: "Kussa shea bliss official website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <div className="min-h-dvh grid grid-rows-[auto,1fr,auto] grid-cols-[minmax(0,1fr)]">
          <MainNav className="mx-6" />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
