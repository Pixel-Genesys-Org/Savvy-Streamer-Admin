import { ChevronDown } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";

const Dropdown = ({
    label = "Select Options",
    placeholder = "Choose...",
    options = [],
    value = [],
    onChange,
    multiple = false,
    required = false,
    error
}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const isSelected = (option) =>
        multiple
            ? value.some((v) => v.value === option.value)
            : value?.value === option.value;

    const toggleOption = (option) => {
        if (multiple) {
            const exists = isSelected(option);
            const updated = exists
                ? value.filter((v) => v.value !== option.value)
                : [...value, option];
            onChange(updated);
        } else {
            onChange(option);
            setOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full text-left" ref={dropdownRef}>
            <label className="text-sm font-medium text-secondary px-3">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div
                className="relative mt-1"
                onClick={() => setOpen((prev) => !prev)}
            >
                <div
                    className="flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md cursor-pointer min-h-[40px]"
                >
                    <div className="flex flex-wrap gap-1 items-center text-sm text-gray-700">
                        {multiple ? (
                            value.length > 0 ? (
                                value.map((v, i) => (
                                    <span
                                        key={i}
                                        className="bg-primary-light text-primary px-2 py-1 rounded text-xs"
                                    >
                                        {v.label}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400">{placeholder}</span>
                            )
                        ) : (
                            <span>
                                {value ? value.label : (
                                    <span className="text-gray-400">{placeholder}</span>
                                )}
                            </span>
                        )}
                    </div>
                    <ChevronDown size={18} className="text-secondary" />
                </div>
                {error && (
                    <p className="text-red-500 mt-1 text-sm px-3">{error}</p>
                )}
                {open && (
                    <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm max-h-60 overflow-y-auto">
                        {options.length === 0 ? (
                            <li className="px-4 py-2 text-sm text-gray-400">No options available</li>
                        ) : (
                            options.map((opt, index) => (
                                <li
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleOption(opt);
                                    }}
                                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-primary-light ${isSelected(opt) ? "bg-primary-light font-medium" : ""
                                        }`}
                                >
                                    {opt.label}
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default memo(Dropdown);
