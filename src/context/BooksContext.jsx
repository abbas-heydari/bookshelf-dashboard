import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";

const BooksContext = createContext(null);
export function BooksProvider({ children }) {
  // note modal state
  const [selectedBook, setSelectedBook] = useState(null);
  // library , favorite page data setting and getting from Local storage
  const safeParse = (key, defaultValue) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw || raw === "undefined") return defaultValue;
      return JSON.parse(raw);
    } catch (e) {
      console.warn(`Failed to parse localStorage key ${key}:`, e);
      return defaultValue;
    }
  };

  const [favorites, setFavorites] = useState(() => safeParse("favorites", []));
  const [library, setLibrary] = useState(() => safeParse("library", []));
  console.log("favorites in context", favorites);
  console.log("library in context", library);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem("library", JSON.stringify(library));
  }, [library]);
  console.log(localStorage.getItem("favorites"));
  console.log(localStorage.getItem("library"));

  const isFavorite = useCallback(
    (id) => favorites.some((b) => b.id === id),
    [favorites],
  );

  const addFavorite = useCallback(
    (book) => {
      console.log("received book:", book);
      setFavorites((prev) => {
        if (prev.some((b) => b.id === book.id)) return prev;
        return [...prev, book];
      });
    },
    [setFavorites],
  );

  const removeFavorite = useCallback(
    (id) => setFavorites((prev) => prev.filter((b) => b.id !== id)),
    [setFavorites],
  );

  const toggleFavorite = useCallback(
    (book) => {
      if (isFavorite(book.id)) removeFavorite(book.id); 
      else addFavorite(book);
    },
    [isFavorite, addFavorite, removeFavorite],
  );

  const inLibrary = useCallback(
    (id) => library.some((b) => b.id === id),
    [library],
  );

  const addToLibrary = useCallback(
    (book) => {
      console.log("received book:", book);
      setLibrary((prev) => {
        if (prev.some((b) => b.id === book.id)) return prev;
        const entry = {
          id: book.id,
          title: book.title,
          cover: book.cover || book.cover_i || null,
          status: "wantToRead",
          notes: [],
          authors: book.authors || book.author_name || [],
        };
        return [...prev, entry];
      });
    },
    [setLibrary],
  );

  const removeFromLibrary = useCallback(
    (id) => setLibrary((prev) => prev.filter((b) => b.id !== id)),
    [setLibrary],
  );

  const toggleLibrary = useCallback(
    (book) => {
      if (inLibrary(book.id)) removeFromLibrary(book.id);
      else addToLibrary(book);
    },
    [inLibrary, addToLibrary, removeFromLibrary],
  );
  const updateStatus = useCallback(
    (id, status) =>
      setLibrary((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b)),
      ),
    [setLibrary],
  );

  const addNote = useCallback(
    (id, note) =>
      setLibrary((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, notes: [...b.notes, note] } : b,
        ),
      ),
    [setLibrary],
  );

  const removeNote = useCallback(
    (id, noteIndex) =>
      setLibrary((prev) =>
        prev.map((b) =>
          b.id === id
            ? { ...b, notes: b.notes.filter((_, i) => i !== noteIndex) }
            : b,
        ),
      ),
    [setLibrary],
  );

  const value = useMemo(
    () => ({
      favorites,
      library,
      selectedBook,
      setSelectedBook,
      isFavorite,
      inLibrary,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      addToLibrary,
      removeFromLibrary,
      updateStatus,
      addNote,
      removeNote,
      toggleLibrary,
    }),
    [
      favorites,
      library,
      selectedBook,
      setSelectedBook,
      isFavorite,
      inLibrary,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      addToLibrary,
      removeFromLibrary,
      updateStatus,
      addNote,
      removeNote,
      toggleLibrary,
    ],
  );

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useBooks = () => useContext(BooksContext);
