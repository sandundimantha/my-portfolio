import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sandun Dimantha | Full Stack Developer",
  description:
    "Portfolio of Sandun Dimantha — MERN Stack Developer, Cloud Enthusiast, and IT Undergraduate at SLIIT. Specializing in Full Stack Development, Cloud Computing, and AI-powered applications.",
  keywords: [
    "Sandun Dimantha",
    "Full Stack Developer",
    "MERN Stack",
    "React",
    "Node.js",
    "SLIIT",
    "Software Engineer",
    "Portfolio",
    "Web Developer",
    "Cloud Computing",
    "AI",
  ],
  authors: [{ name: "Sandun Dimantha" }],
  creator: "Sandun Dimantha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sandundimantha.vercel.app",
    title: "Sandun Dimantha | Full Stack Developer",
    description:
      "Portfolio of Sandun Dimantha — MERN Stack Developer, Cloud Enthusiast, and IT Undergraduate at SLIIT.",
    siteName: "Sandun Dimantha Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandun Dimantha | Full Stack Developer",
    description:
      "Portfolio of Sandun Dimantha — MERN Stack Developer, Cloud Enthusiast, and IT Undergraduate at SLIIT.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
