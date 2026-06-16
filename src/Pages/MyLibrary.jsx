import { useState } from "react";
import { FiBookOpen, FiCheckCircle, FiClock, FiLayers } from "react-icons/fi";
import SearchBar from "../Components/Discover/SearchBar";
import BookCard from "../Components/Discover/BookCard";
import { useBooks } from "../context/BooksContext";
import BookDetailModal from "../Components/BookDetailModal";

const STATUS_OPTIONS = [
  {
    value: "all",
    label: "All books",
    icon: FiLayers,
    statClass: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
  {
    value: "reading",
    label: "Reading",
    icon: FiBookOpen,
    statClass: "bg-sky-50 text-sky-700 ring-sky-100",
  },
  {
    value: "finished",
    label: "Finished",
    icon: FiCheckCircle,
    statClass: "bg-violet-50 text-violet-700 ring-violet-100",
  },
  {
    value: "wantToRead",
    label: "Want to read",
    icon: FiClock,
    statClass: "bg-amber-50 text-amber-700 ring-amber-100",
  },
];

const MyLibrary = () => {
  const { library, updateStatus } = useBooks();
  const [query, setQuery] = useState("");

  function handleStatusChange(id, status) {
    updateStatus(id, status);
  }
  const [activeTab, setActiveTab] = useState("all");

  const filteredLibrary = library.filter((book) => {
    if (activeTab === "all") return true;
    return book.status === activeTab;
  });
  const statusCounts = library.reduce(
    (counts, book) => ({
      ...counts,
      [book.status]: (counts[book.status] || 0) + 1,
    }),
    {
      all: library.length,
      reading: 0,
      finished: 0,
      wantToRead: 0,
    },
  );
  const displayedBooks = filteredLibrary.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      (book.authors || []).some((a) =>
        a.toLowerCase().includes(query.toLowerCase()),
      ),
  );

  return (
    <div className="w-full min-w-0 px-4 py-12 sm:px-6 lg:px-10 z-20">
      <header className="mb-8 overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm shadow-slate-200/70 backdrop-blur md:p-7">
        <div className="flex flex-col gap-5 ">
          <div>
            <span className="mb-2 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
              Personal shelf
            </span>
            <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">
              My Library
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Track your saved books by reading status and keep your shelf easy
              to scan.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[34rem]">
            {STATUS_OPTIONS.map(({ value, label, icon: Icon, statClass }) => (
              <div
                key={value}
                className={`rounded-2xl px-4 py-3 ring-1 ${statClass}`}
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium">{label}</span>
                  <Icon className="shrink-0" />
                </div>
                <strong className="block text-2xl font-bold leading-none">
                  {statusCounts[value]}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="mb-8 flex w-full min-w-0 flex-col gap-4 rounded-3xl border border-slate-200 bg-white/85 p-3 shadow-sm shadow-slate-200/60 xl:flex-row xl:items-center">
        <SearchBar
          query={query}
          setQuery={setQuery}
          className="w-full min-w-0 flex-1"
          inputClassName="w-full min-w-0"
          placeholder="Search your saved books"
        />

        <div className="w-full min-w-0 xl:w-auto xl:flex-none">
          <ul className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 xl:min-w-[34rem]">
            {STATUS_OPTIONS.map(({ value, label }) => {
              const isActive = activeTab === value;

              return (
                <li key={value} className="min-w-0">
                  <button
                    type="button"
                    className={`flex h-11 w-full items-center justify-center gap-2 rounded-2xl px-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-slate-950 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                    onClick={() => setActiveTab(value)}
                  >
                    <span className="truncate">{label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "bg-white text-slate-500"
                      }`}
                    >
                      {statusCounts[value]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* book content  */}
      <div className="transition-opacity duration-300">
        <div
          className="grid min-h-80 grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6"
          style={{ minHeight: "20rem" }}
        >
          {displayedBooks.length > 0 ? (
            displayedBooks.map((book) => (
              <div
                key={book.id}
                className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-200/60 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <BookCard book={book} className="w-full" />
                <h4 className="mt-3 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-slate-900">
                  {book.title}
                </h4>
                <select
                  name="status"
                  id={`toggleStatus-${book.id}`}
                  value={book.status}
                  onChange={(e) => handleStatusChange(book.id, e.target.value)}
                  className="mt-3 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 outline-none transition-colors hover:bg-white focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="wantToRead">Want to read </option>
                  <option value="reading"> Reading </option>
                  <option value="finished"> Finished </option>
                </select>
              </div>
            ))
          ) : (
            <div className="col-span-full flex min-h-80 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/70 text-slate-500">
              <div className="text-center">
                <p className="mb-4">No books in this status.</p>
                <button
                  type="button"
                  className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                  onClick={() => {
                    setQuery("");
                    setActiveTab("all");
                  }}
                >
                  Show All Books
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <BookDetailModal />
    </div>
  );
};
export default MyLibrary;
