import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Internship Search Platform",
  description: "A premium modern internship search platform built with NextJS and React.",
  openGraph: {
    title: "Internship Search Platform",
    description: "A premium modern internship search platform built with NextJS and React.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
