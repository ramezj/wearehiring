
import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { GeistSans } from "geist/font"
import "./globals.css";
import { SessionProvider } from "../lib/SessionProvider"
import { NavigationBar } from "@/components/NavigationBar";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "wearehiring",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
          <body className={inter.className}>
            {children}
          </body>
      </SessionProvider>
    </html>
  );
}
