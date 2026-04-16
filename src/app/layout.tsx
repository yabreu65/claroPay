import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claro Pay Landing",
  description: "Landing frontend modular para Claro Pay",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
