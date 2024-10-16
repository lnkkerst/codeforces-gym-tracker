import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "./components/client-providers";
import { DefaultLayout } from "@/components/layouts/default";
import { GlobalEffects } from "./components/global-effects";

export const metadata: Metadata = {
  title: "Codeforces GYM Tracker",
  description: "获取 Codeforces 参加过的 gym",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="bg-base-200">
      <body>
        <ClientProviders>
          <GlobalEffects />
          <DefaultLayout>{children}</DefaultLayout>
        </ClientProviders>
      </body>
    </html>
  );
}
