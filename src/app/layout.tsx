import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FooterComponent } from "@/components/footer";
import { NavbarComponent } from "@/components/navbar";
import { AuthProvider } from "./authContext";
import { ThemeProvider } from "./themeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anotador",
  description: "Anotador de tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <NavbarComponent />
            {children}
            <FooterComponent />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
