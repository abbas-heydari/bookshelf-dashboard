import {
  FiBookOpen,
  FiBookmark,
  FiGrid,
  FiHeart,
  FiHelpCircle,
  FiSearch,
  FiSliders,
} from "react-icons/fi";

const helpCards = [
  {
    icon: FiSearch,
    title: "Discover books",
    text: "Search by title or author, then open a book to preview details before saving it.",
  },
  {
    icon: FiBookmark,
    title: "Save to library",
    text: "Use the bookmark action to add a book to your library. New books start as Want to read.",
  },
  {
    icon: FiSliders,
    title: "Update status",
    text: "Switch books between Want to read, Reading, and Finished from the library or detail drawer.",
  },
  {
    icon: FiHeart,
    title: "Favorite books",
    text: "Tap the heart on books you love so they stay collected on your Favorites page.",
  },
];

const faqs = [
  {
    question: "Where are my saved books stored?",
    answer:
      "Your library and favorites are saved in this browser, so they stay available when you come back on the same device.",
  },
  {
    question: "How do I add notes to a book?",
    answer:
      "Open a saved book, choose a reading status if needed, then add notes from the detail drawer.",
  },
  {
    question: "Can I browse without searching?",
    answer:
      "Yes. Use Categories to explore subjects, or start from Discover recommendations.",
  },
  {
    question: "Why does a cover sometimes look missing?",
    answer:
      "Book covers come from Open Library. Some titles do not have cover artwork available yet.",
  },
];

const Help = () => {
  return (
    <div className="w-full min-w-0 px-4 py-12 sm:px-6 lg:px-10 z-20">
      <header className="mb-8 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-sm shadow-slate-200/70 backdrop-blur md:p-7">
        <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 ring-1 ring-teal-100">
          <FiHelpCircle />
          Help center
        </span>
        <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">
          How to use Book Library
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          A quick guide to finding books, saving them to your shelves, tracking
          reading progress, and keeping useful notes.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {helpCards.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Icon />
            </div>
            <h3 className="text-lg font-bold text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm shadow-slate-200/60 md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
              <FiBookOpen />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-950">
                Recommended workflow
              </h3>
              <p className="text-sm text-slate-500">
                The smoothest way to build your reading shelf.
              </p>
            </div>
          </div>

          <ol className="space-y-3">
            {[
              "Search or browse categories to find a book.",
              "Open the book detail drawer to review title, author, and cover.",
              "Choose a reading status to save it into your library.",
              "Add notes while reading and move it to Finished when done.",
            ].map((step, index) => (
              <li
                key={step}
                className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm md:p-6">
          <FiGrid className="mb-5 text-2xl text-teal-300" />
          <h3 className="text-xl font-bold">Shelf statuses</h3>
          <div className="mt-5 space-y-3 text-sm">
            <p className="rounded-2xl bg-white/10 p-3">
              <strong>Want to read:</strong> books you saved for later.
            </p>
            <p className="rounded-2xl bg-white/10 p-3">
              <strong>Reading:</strong> books you are actively reading.
            </p>
            <p className="rounded-2xl bg-white/10 p-3">
              <strong>Finished:</strong> books you have completed.
            </p>
          </div>
        </aside>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm shadow-slate-200/60 md:p-6">
        <h3 className="text-xl font-bold text-slate-950">
          Frequently asked questions
        </h3>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {faqs.map(({ question, answer }) => (
            <article
              key={question}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <h4 className="font-semibold text-slate-900">{question}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-500">{answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Help;
