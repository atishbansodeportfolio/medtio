import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medtio - Find the Best Doctors, Clinics & Hospitals in India",
  description: "Search and compare the top doctors, clinics, and hospitals in India on Medtio. Find expert care, compare ratings, and read real patient reviews.",
  verification: {
    google: "eZFw9-5qb7CNLK-pfN0VvKEPyL5CXIk8q2ojhD2YxgU",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ colorScheme: 'light' }}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "only light",
};
