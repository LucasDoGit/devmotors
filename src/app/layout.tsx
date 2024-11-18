import type { Metadata } from "next";
import "./globals.scss";

import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Devmotors - Sua oficina especializada",
  description: "Oficina de carros especializada em Curitiba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
