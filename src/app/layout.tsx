import type { Metadata } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Workflow Builder Lite — AI-Powered Text Automation",
  description: "Create simple text processing workflows with AI. Clean, summarize, extract key points, and more — all in a few clicks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} antialiased text-black bg-white min-h-screen`}
      >
        <main className="mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
