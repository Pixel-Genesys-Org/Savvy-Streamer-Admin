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
  error,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isSelected = (option) =>
    multiple ? value.some((v) => v.value === option.value) : value?.value === option.value;

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
      <label className="px-3 text-sm font-medium text-white">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <div className="relative mt-1" onClick={() => setOpen((prev) => !prev)}>
        <div className="flex min-h-[44px] cursor-pointer items-center justify-between rounded-full border border-white/15 bg-white/5 px-4 py-2 transition hover:border-cyan/40">
          <div className="flex flex-wrap items-center gap-1 text-sm text-white">
            {multiple ? (
              value.length > 0 ? (
                value.map((v, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-primary/20 px-2 py-1 text-xs text-primary"
                  >
                    {v.label}
                  </span>
                ))
              ) : (
                <span className="text-white/40">{placeholder}</span>
              )
            ) : (
              <span>
                {value ? value.label : <span className="text-white/40">{placeholder}</span>}
              </span>
            )}
          </div>
          <ChevronDown
            size={18}
            className={`text-cyan transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
        {error && <p className="mt-1 px-3 text-sm text-error">{error}</p>}
        {open && (
          <ul className="glass-panel absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-white/10 shadow-xl">
            {options.length === 0 ? (
              <li className="px-4 py-2 text-sm text-muted">No options available</li>
            ) : (
              options.map((opt, index) => (
                <li
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(opt);
                  }}
                  className={`cursor-pointer px-4 py-2.5 text-sm transition-colors hover:bg-primary/15 ${
                    isSelected(opt) ? "bg-primary/20 font-medium text-primary" : "text-white"
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
