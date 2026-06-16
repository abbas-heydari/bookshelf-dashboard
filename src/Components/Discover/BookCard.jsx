import { FaBookmark } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useBooks } from "../../context/BooksContext";

const BookCard = ({ book, className = "" }) => {
  const {
    isFavorite,
    inLibrary,
    toggleFavorite,
    toggleLibrary,
    setSelectedBook,
  } = useBooks();

  const id = book.id || book.key;
  const favorited = isFavorite(id);
  const bookMarked = inLibrary(id);
  const coverUrl =
    book.cover_i || book.cover
      ? `https://covers.openlibrary.org/b/id/${book.cover_i || book.cover}-M.jpg`
      : book.cover_edition_key
        ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key || book.cover}-M.jpg`
        : "/placeholder-book.png";

  const minimalBook = {
    id: book.id || book.key,
    title: book.title,
    cover: book.cover_i || book.cover_edition_key || book.cover || null,
    cover_edition_key: book.cover_edition_key ?? null,
    authors: book.author_name || book.authors || [],
    status: book.status || null,
  };
  function handleToggleFavorite(e) {
    e.stopPropagation();
    toggleFavorite(minimalBook);
  }
  function handleToggleLibrary(e) {
    e.stopPropagation();
    toggleLibrary(minimalBook);
  }

  return (
    <div
      onClick={() => setSelectedBook(minimalBook)}
      className={`${className || "w-37 sm:w-40 md:w-44 lg:w-48"} aspect-2/3 rounded-2xl shrink-0 snap-start relative group`}
    >
      <img
        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
        src={coverUrl}
        alt={book.title}
      />

      <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
        <button
          onClick={handleToggleFavorite}
          className="p-2 rounded-full backdrop-blur-sm bg-white/30 hover:bg-white/50 text-white cursor-pointer w-10 h-10 flex items-center justify-center"
        >
          <FaHeart
            className={`${favorited ? "text-red-500/80" : ""}`}
            size={18}
          />
        </button>

        <button
          onClick={handleToggleLibrary}
          className="p-2 rounded-full backdrop-blur-sm bg-white/30 hover:bg-white/50 text-white cursor-pointer w-10 h-10 flex items-center justify-center ml-2"
        >
          <FaBookmark
            className={`${bookMarked ? "text-black hover:text-black" : ""}`}
            size={18}
          />
        </button>
      </div>
    </div>
  );
};
export default BookCard;
