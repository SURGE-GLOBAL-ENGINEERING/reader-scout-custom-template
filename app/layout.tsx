import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import { cva } from "class-variance-authority";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Define body styles using cva
const bodyStyles = cva(["min-h-screen bg-background font-sans antialiased"], {
  variants: {
    fontClass: {
      default: "",
    },
  },
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Author", "Books", "Writing"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Enable static rendering for all pages by default
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate at most every hour

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyStyles()} ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
