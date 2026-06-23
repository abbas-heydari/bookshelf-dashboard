import { BiSearch } from "react-icons/bi";
const SearchBar = ({
  query,
  setQuery,
  onSearch,
  className = "py-12 flex-1 ",
  inputClassName = "max-w-1/2 min-w-64",
  placeholder = "find the book you like",
}) => {
  return (
    <div className={className}>
      <div
        className={`flex items-center text-[0.8rem] bg-white rounded-2xl p-3 ${inputClassName}`}
      >
        <div className="flex items-center flex-1 gap-2">
          <BiSearch className="text-gray-700" />
          <input
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch?.();
            }}
          />
        </div>

        {onSearch && (
          <button
            onClick={onSearch}
            className="bg-[#0b4429f0] text-white px-4 py-1 rounded-sm cursor-pointer hover:bg-[#2d8059] transition-colors duration-300"
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
};
export default SearchBar;
