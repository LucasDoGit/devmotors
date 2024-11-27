import type { Metadata } from "next";
import "./globals.scss";

import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Devmotors - Sua oficina especializada",
  description: "Oficina de carros especializada em Curitiba",
  keywords: ["oficina", "oficina carros", "carros", "manutenção de carros"],
  openGraph: {
    title: "Devmotors - Sua oficina especializada",
    images: [`${process.env.NEXT_PUBLIC_URL}/logo.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    }
  }
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

        <p style={{ textAlign: 'center', marginTop: 54,  marginBottom: 24 }}>
            Todos os direitos reservados @{`${new Date().getFullYear()}`}
        </p>
      </body>
    </html>
  );
}
