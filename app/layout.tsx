import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARTbot — Gerador de Desafios Criativos",
  description:
    "Gere desafios criativos únicos para aulas de artes visuais e cerâmica. Um projeto do Barro na Veia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
