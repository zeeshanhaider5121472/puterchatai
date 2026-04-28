import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Galaxy Qwen Chat",
  description: "Minimalistic Galaxy AI Chat powered by Puter.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} galaxy-bg text-zinc-900 dark:text-white transition-colors h-screen flex flex-col antialiased`}>
        {/* Load Puter.js inside the body with afterInteractive strategy */}
        <Script src="https://js.puter.com/v2/" strategy="afterInteractive" />
        
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}