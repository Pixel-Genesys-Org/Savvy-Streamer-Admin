import { Search, X } from "lucide-react";

const SearchBox = ({ value = "", onChange, placeholder = "Search..." }) => {
  return (
    <div className="w-full">
      <div className="relative flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2.5 transition focus-within:border-cyan/60 focus-within:shadow-[0_0_0_3px_rgba(107,224,254,0.12)]">
        <Search className="mr-2 text-cyan" size={18} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="ml-2 cursor-pointer text-error transition hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
