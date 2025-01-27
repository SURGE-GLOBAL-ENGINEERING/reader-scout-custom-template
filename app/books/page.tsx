/* eslint-disable @next/next/no-img-element */
import { booksApi } from "@/api/books";
import type { GetBooksResponse } from "@/types/books.types";
import Link from "next/link";

// Mark as async server component
export default async function BooksPage() {
  let books: GetBooksResponse[] = [];
  let error: string | null = null;

  try {
    const bookIds = "1,2,3"; // Example IDs - replace with actual book IDs
    books = await booksApi.getBooksByIds({
      bookIds,
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    error = "Failed to fetch books";
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Error</h1>
          <p className="text-muted-foreground">{error}</p>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-12">
      <header className="mb-12 space-y-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Home
        </Link>

        <div>
          <h1 className="text-4xl font-bold">Books</h1>
          <p className="mt-2 text-muted-foreground">
            Explore our collection of books
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <article
            key={book.id}
            className="group border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-[3/4] relative bg-muted">
              {book.cover_image ? (
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <span className="text-muted-foreground">No cover</span>
                </div>
              )}
            </div>

            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {book.title}
              </h2>

              {book.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {book.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
                    >
                      {genre.value}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-muted-foreground line-clamp-3">
                {book.description}
              </p>

              {book.formats.length > 0 && (
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">
                    Available Formats:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {book.formats.map((format) => (
                      <span
                        key={format.id}
                        className="px-3 py-1 text-sm border rounded-md"
                      >
                        {format.format}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
