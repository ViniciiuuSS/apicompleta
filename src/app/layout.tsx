import type { Metadata } from "next";
import "./globals.css";
import { FooterComponent } from "@/components/footer";
import { NavbarComponent } from "@/components/navbar";
import { AuthProvider } from "./authContext";
export const metadata: Metadata = {
  title: "Anotador",
  description: "Anotador",  
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <AuthProvider>
          <NavbarComponent/>
          {children}
          <FooterComponent />
        </AuthProvider>
      </body>
    </html>
  );
}
