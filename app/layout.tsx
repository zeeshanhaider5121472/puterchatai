import { AppProvider } from "@/context/AppContext";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Galaxy AI Chat",
  description: "Minimalistic Galaxy AI Chat powered by Puter.js",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load Puter synchronously in head to prevent mobile initialization crashes */}
        <script src="https://js.puter.com/v2/" async></script>
      </head>
      <body
        className={`${inter.className} galaxy-bg text-zinc-900 dark:text-white transition-colors h-[100dvh] overflow-hidden antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
