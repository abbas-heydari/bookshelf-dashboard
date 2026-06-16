import { useEffect, useState } from "react";
import { getBooksBySubject } from "../Services/OpenLibrary";
import CategoryCard from "../Components/Categories/CategoryCard";
import BookCard from "../Components/Discover/BookCard";
import BookDetailModal from "../Components/BookDetailModal";
import { FiGrid, FiLoader } from "react-icons/fi";

const categoriesTitle = [
  "fiction",
  "science",
  "history",
  "business",
  "technology",
  "sports",
  "art",
  "biography",
  "self-help",
  "love",
  "programming",
  "language",
  "medical",
];

const Categories = () => {
  const categories = categoriesTitle.map((name) => ({ name }));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [booksBycategory, setBooksByCategory] = useState({});

  // Fetch cover images for each category once

  // When a category is selected, fetch its books if not cached
  useEffect(() => {
    if (!selectedCategory) return;
    if (booksBycategory[selectedCategory]) return; // already cached

    let mounted = true;
    async function loadBooks() {
      const works = await getBooksBySubject(selectedCategory, 0);
      // transform works to shape expected by BookCard
      const mapped = (works || []).slice(0, 20).map((w) => ({
        key: w.key || w.cover_edition_key || w.title,
        id: w.key || w.cover_edition_key || w.title,
        title: w.title,
        cover_i: w.cover_id ?? null,
        authors: w.authors ? w.authors.map((a) => a.name) : [],
      }));
      if (mounted)
        setBooksByCategory((prev) => ({ ...prev, [selectedCategory]: mapped }));
    }
    loadBooks();
    return () => {
      mounted = false;
    };
  }, [selectedCategory, booksBycategory]);
  return (
    <div className="z-10 w-full min-w-0 px-4 py-6 sm:px-6 lg:px-10">
      <header className="mb-8 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-sm shadow-slate-200/70 backdrop-blur md:p-7">
        <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 ring-1 ring-indigo-100">
          <FiGrid />
          Browse shelves
        </span>
        <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">
          Book Categories
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Explore curated subjects and open a focused row of titles from each
          category.
        </p>
      </header>

      {/*Category grid  */}
      <div className="rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-sm shadow-slate-200/60">
        <div className="flex gap-4 overflow-x-auto overflow-y-hidden snap-x pb-2 scroll-smooth hide-Scrollbar sm:gap-5">
        {categories.map((c) => (
          <CategoryCard
            category={c}
            key={c.name}
            isActive={selectedCategory === c.name}
            selectedCategory={setSelectedCategory}
          />
        ))}
        </div>
      </div>

      {/* CategoryBooks */}
      {selectedCategory && (
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold capitalize text-slate-950">
                {selectedCategory} books
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {(booksBycategory[selectedCategory] || []).length || "Loading"}{" "}
                titles in this row
              </p>
            </div>
          </div>

          {!booksBycategory[selectedCategory] ? (
            <div className="flex min-h-56 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/70 text-slate-500">
              <FiLoader className="mr-2 animate-spin" />
              Loading books...
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
              {(booksBycategory[selectedCategory] || []).map((book) => (
              <div
                key={book.key}
                className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-200/60 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <BookCard book={book} className="w-full" />
                <h2 className="mt-3 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-slate-900">
                  {book.title}
                </h2>
                <p className="mt-1 truncate text-xs text-slate-500">
                  {(book.authors || []).join(", ") || "Unknown author"}
                </p>
              </div>
            ))}
            </div>
          )}
        </section>
      )}
      <BookDetailModal />
    </div>
  );
};
export default Categories;
