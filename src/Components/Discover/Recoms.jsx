import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import { fetchRecommendedBooks } from "../../Services/OpenLibrary";

// memoize fetching books to note sending request fory every changes on pages
const Recoms = () => {
  const [books, setBooks] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function loadBooks() {
      const data = await fetchRecommendedBooks();
      setBooks(data);
    }
    loadBooks();
  }, []);

  const visibleBooks = showAll ? books.slice(0, 40) : books.slice(0, 10);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-[1.25rem]">Recommendations</h2>
        <button
          onClick={() => setShowAll((current) => !current)}
          className="text-[0.875rem] font-medium bg-white px-3 py-1 rounded-sm hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
        >
          {showAll ? "show less" : "view all >"}
        </button>
      </div>

      {/* Book Cards */}
      <div
        className={
          showAll
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 "
            : "flex gap-8 overflow-x-auto overflow-y-hidden snap-x pb-4 scroll-smooth hide-Scrollbar"
        }
      >
        {visibleBooks.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
};
export default Recoms;
