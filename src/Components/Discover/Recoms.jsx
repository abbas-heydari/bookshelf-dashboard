import BookCard from "./BookCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecommendedBooks } from "../../Services/OpenLibrary";

const Recoms = () => {
  const [showAll, setShowAll] = useState(false);

  const { data: books = [] } = useQuery({
    queryKey: ["recommendedBooks"],
    queryFn: fetchRecommendedBooks,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    gcTime: 1000 * 60 * 60 * 24, // Keep inactive cache for 24 hours
  });

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

