import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nazmul Hossain | Software Engineer Portfolio",
  description:
    "Personal developer portfolio showcasing modern full-stack web applications, technical projects, and software engineering capabilities.",
  keywords: [
    "Nazmul Hossain",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
  ],
  authors: [{ name: "Nazmul Hossain" }],
  openGraph: {
    title: "Nazmul Hossain | Software Engineer Portfolio",
    description:
      "Crafting digital products with modern architectures, low-latency microservices & intelligent web experiences.",
    siteName: "Nazmul Hossain Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
