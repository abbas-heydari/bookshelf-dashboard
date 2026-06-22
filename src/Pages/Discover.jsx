import { useState } from "react";
import SearchBar from "../Components/Discover/SearchBar";
import Recoms from "../Components/Discover/Recoms";
import { searchBooks } from "../Services/OpenLibrary";
import BookCard from "../Components/Discover/BookCard";
import BookCardSkeleton from "../Components/Discover/BookCardSkeleton";
import BookDetailModal from "../Components/BookDetailModal";

const Discover = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;

    setIsLoading(true);

    const results = await searchBooks(query);

    setSearchResults(results);

    setIsLoading(false);
    setHasSearched(true);
  }
  console.log("Returned books from search:", searchResults);
  let content;

  if (isLoading) {
    content = (
      <div>
        <p>Loading...</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  } else if (hasSearched && searchResults.length === 0) {
    content = <div> no mathches found </div>;
  } else if (hasSearched) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchResults.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    );
  } else {
    content = (
      <div className="flex-1 max-w-6xl">
        <Recoms />
      </div>
    );
  }
  return (
    <div className=" relative p-10 rounded-bl-3xl flex-1 min-w-0 z-10 font-josefin-sans">
      <h1 className="font-bold  text-[2rem] mb-6">Discover</h1>

      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <div>{content}</div>
      <BookDetailModal />
    </div>
  );
};
export default Discover;
