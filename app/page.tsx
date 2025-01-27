import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { StorageExample } from "@/examples/storage-example";
import Link from "next/link";

// Only dynamically import client components
const CartStoreExample = dynamic(
  () => import("@/examples/cart-example").then((mod) => mod.CartStoreExample),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          {/* Add navigation links */}
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link
                  href="/"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Books
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold">
            Custom Author Website Boilerplate
          </h1>
          <Image
            className="dark:invert mx-auto mt-2"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={25}
            priority
          />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive starter template with Next.js 14+, TypeScript,
            Tailwind CSS, and more.
          </p>
        </section>

        {/* Examples Section */}
        <section className="space-y-8">
          {/* Cart Store Example */}
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Cart Store Example</h2>
            <Suspense
              fallback={
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Loading cart example...
                </div>
              }
            >
              <CartStoreExample />
            </Suspense>
          </div>

          {/* Storage Example */}
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-4">
              Local Storage Example
            </h2>
            <StorageExample />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-8 py-6 text-center text-sm text-muted-foreground">
          Built with Next.js, TypeScript, and Tailwind CSS
        </div>
      </footer>
    </div>
  );
}
