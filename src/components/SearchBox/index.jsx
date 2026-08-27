import { Search, X } from "lucide-react";

const SearchBox = ({ value = "", onChange, placeholder = "Search..." }) => {
    return (
        <div className="w-full">
            <div className="relative px-3 bg-white border border-gray-300 rounded-md py-2.5 flex items-center">
                <Search className="text-secondary mr-2" size={18} />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-sm"
                />
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="ml-2 text-red-500 hover:text-gray-700 cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBox;
