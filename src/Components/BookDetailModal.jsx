import { useState, useEffect, useRef } from "react";
import { useBooks } from "../context/BooksContext";
import { createPortal } from "react-dom";
import useFocusTrap from "../Hooks/focusTrap";
import {
  FiBookmark,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiTrash2,
  FiX,
} from "react-icons/fi";

const STATUS_OPTIONS = [
  {
    value: "wantToRead",
    label: "Want to read",
    icon: FiClock,
    classes: "peer-checked:border-amber-400 peer-checked:bg-amber-50",
  },
  {
    value: "reading",
    label: "Reading",
    icon: FiBookOpen,
    classes: "peer-checked:border-sky-400 peer-checked:bg-sky-50",
  },
  {
    value: "finished",
    label: "Finished",
    icon: FiCheckCircle,
    classes: "peer-checked:border-emerald-400 peer-checked:bg-emerald-50",
  },
];

const BookDetailModal = () => {
  const {
    removeNote,
    addNote,
    selectedBook,
    setSelectedBook,
    library,
    addToLibrary,
    updateStatus,
  } = useBooks();
  const [noteText, setNoteText] = useState("");

  // FocusTrap: Traps keyboard focus within modal to prevent tabbing outside
  const modalRef = useFocusTrap(selectedBook !== null);

  // Close modal when Escape key is pressed (standard dialog behavior)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && selectedBook) {
        setSelectedBook(null);
      }
    };

    if (selectedBook) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [selectedBook, setSelectedBook]);

  const book = selectedBook;
  if (!book) return null;

  const savedBook = library.find((item) => item.id === book.id);
  const activeBook = savedBook || book;
  const activeStatus = savedBook?.status || book.status || "";
  const authors = activeBook.authors || activeBook.author_name || [];
  const coverUrl =
    activeBook.cover_i || activeBook.cover
      ? `https://covers.openlibrary.org/b/id/${activeBook.cover_i || activeBook.cover}-M.jpg`
      : activeBook.cover_edition_key
        ? `https://covers.openlibrary.org/b/olid/${activeBook.cover_edition_key}-M.jpg`
        : "/placeholder-book.png";

  function handleStatusChange(status) {
    if (savedBook) {
      updateStatus(activeBook.id, status);
      setSelectedBook({ ...activeBook, status });
      return;
    }

    addToLibrary({ ...activeBook, status });
    updateStatus(activeBook.id, status);
    setSelectedBook({ ...activeBook, status });
  }

  return createPortal(
    <div
      onClick={() => setSelectedBook(null)}
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/45 backdrop-blur-[2px]"
    >
      {/* Modal panel with focus trap and dialog semantics */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Book details preview"
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-lg flex-col overflow-y-auto bg-white shadow-2xl shadow-slate-950/20"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Book details
            </span>
            <h1 className="text-lg font-bold text-slate-950">Shelf preview</h1>
          </div>
          {/* Close button: clicking anywhere on backdrop also closes modal for convenience */}
          <button
            onClick={() => setSelectedBook(null)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
            aria-label="Close book details"
          >
            <FiX />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-5">
          <section className="flex gap-4">
            <img
              src={coverUrl}
              alt={activeBook.title}
              className="h-44 w-28 shrink-0 rounded-2xl object-cover shadow-lg shadow-slate-200"
            />
            <div className="min-w-0 flex-1">
              <h2 className="line-clamp-3 text-2xl font-bold leading-tight text-slate-950">
                {activeBook.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                {authors.join(", ") || "Unknown author"}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                <FiBookmark />
                {savedBook ? "Saved in library" : "Not in library yet"}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              About
            </span>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Between life and death lies a library with infinite books, each
              telling the story of a different life you could have lived.
            </p>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-950">
                Reading status
              </span>
              <span className="text-xs text-slate-400">
                {savedBook ? "Tap to update" : "Tap to save"}
              </span>
            </div>
            {/* Status radio buttons use hidden inputs with visual labels for better UX and accessibility */}
            <div className="grid gap-2">
              {STATUS_OPTIONS.map(({ value, label, icon: Icon, classes }) => {
                const isSelected = activeStatus === value;

                return (
                  <label key={value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="bookStatus"
                      value={value}
                      checked={isSelected}
                      onChange={() => handleStatusChange(value)}
                      className="peer sr-only"
                    />
                    <span
                      className={`flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 ${classes}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                          <Icon />
                        </span>
                        {label}
                      </span>
                      <span
                        className={`h-3 w-3 rounded-full border ${
                          isSelected
                            ? "border-slate-950 bg-slate-950"
                            : "border-slate-300 bg-white"
                        }`}
                      />
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          <section className="flex flex-col gap-3">
          {/* Note input requires book to be saved first (enforced by disabled state) */}
          <label htmlFor="book-note" className="text-sm font-bold text-slate-950">
            Add a note
          </label>
          <textarea
            id="book-note"
            type="text"
            placeholder="Write a thought, quote, or reminder..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows={4}
            className="resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />
          <div className="flex justify-end">
            <button
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={!noteText.trim() || !savedBook}
              onClick={() => {
                const trimmed = noteText.trim();
                if (!trimmed || !savedBook) return;
                addNote(activeBook.id, trimmed);
                setNoteText("");
              }}
            >
              Save note
            </button>
          </div>
          {!savedBook && (
            <p className="text-xs text-slate-400">
              Choose a reading status first to save this book before adding
              notes.
            </p>
          )}
          </section>

          <section>
            <h4 className="mb-3 text-sm font-bold text-slate-950">
              Existing notes
            </h4>
            {/* Display saved notes with delete action for each; users can manage their thoughts on books */}
            {(activeBook.notes || []).length > 0 ? (
              <ul className="space-y-2">
                {(activeBook.notes || []).map((n, i) => (
                  <li
                    key={i}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-600"
                  >
                    <span>{typeof n === "string" ? n : String(n)}</span>
                    <button
                      onClick={() => removeNote(activeBook.id, i)}
                      className="mt-0.5 text-slate-400 transition-colors hover:text-rose-500"
                      aria-label="Delete note"
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-400">
                No notes for this book yet.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default BookDetailModal;
