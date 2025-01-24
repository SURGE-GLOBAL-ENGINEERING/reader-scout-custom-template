import { booksApi } from "@/api/books";
import type { GetBooksResponse } from "@/types/books.types";

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
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}
