import { useBooks } from "../context/BooksContext";
import BookCard from "../Components/Discover/BookCard";
import BookDetailModal from "../Components/BookDetailModal";
import { FiHeart } from "react-icons/fi";

const Favorite = () => {
  const { favorites } = useBooks();

  return (
    <div className="w-full min-w-0 px-4 py-12 sm:px-6 lg:px-10 z-20">
      <header className="mb-8 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-sm shadow-slate-200/70 backdrop-blur md:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700 ring-1 ring-rose-100">
              <FiHeart />
              Saved picks
            </span>
            <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">
              My Favorites
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              A clean shelf for the books you want to come back to first.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white shadow-sm">
            <span className="block text-xs font-medium text-white/60">
              Favorite books
            </span>
            <strong className="mt-1 block text-3xl font-bold leading-none">
              {favorites.length}
            </strong>
          </div>
        </div>
      </header>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {favorites.map((book) => (
            <div
              className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-200/60 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              key={book.id}
            >
              <BookCard book={book} className="w-full" />
              <h4 className="mt-3 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-slate-900">
                {book.title}
              </h4>
              <p className="mt-1 truncate text-xs text-slate-500">
                {(book.authors || []).join(", ") || "Unknown author"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-80 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 text-center text-slate-500">
          <div>
            <FiHeart className="mx-auto mb-3 text-3xl text-rose-400" />
            <p className="font-semibold text-slate-700">
              No favorites saved yet.
            </p>
            <p className="mt-1 text-sm">
              Tap the heart on a book to build this shelf.
            </p>
          </div>
        </div>
      )}
      <BookDetailModal />
    </div>
  );
};
export default Favorite;
