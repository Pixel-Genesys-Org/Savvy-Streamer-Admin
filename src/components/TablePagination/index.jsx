import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PAGE_SIZE_OPTIONS = [10, 25, 50];

const RowsDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-9 min-w-[84px] cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 text-sm font-medium text-white transition ${
          open
            ? "border-cyan/50 bg-white/10 shadow-[0_0_0_3px_rgba(107,224,254,0.12)]"
            : "border-white/15 bg-white/5 hover:border-cyan/40 hover:bg-white/10"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {value}
        <ChevronDown
          size={14}
          className={`text-cyan transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="glass-panel absolute right-0 bottom-11 z-20 min-w-full overflow-hidden rounded-xl border border-white/10 py-1 shadow-xl"
        >
          {PAGE_SIZE_OPTIONS.map((size) => {
            const selected = size === value;
            return (
              <li key={size}>
                <button
                  type="button"
                  onClick={() => {
                    onChange?.(size);
                    setOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-center px-3 py-2 text-sm transition ${
                    selected
                      ? "bg-gradient-to-r from-cyan/20 to-primary/20 font-semibold text-white"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {size}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const TablePagination = ({
  page = 1,
  page_size = 10,
  total = 0,
  total_pages = 1,
  onPageChange,
  onPageSizeChange,
}) => {
  const safe_pages = Math.max(1, total_pages || 1);
  const safe_page = Math.min(Math.max(1, page || 1), safe_pages);
  const from = total === 0 ? 0 : (safe_page - 1) * page_size + 1;
  const to = Math.min(safe_page * page_size, total);

  useEffect(() => {
    if (page > safe_pages) {
      onPageChange?.(safe_pages);
    }
  }, [page, safe_pages, onPageChange]);

  if (!total) return null;

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-sm text-muted">
        Showing {from}–{to} of {total}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">Rows</span>
          <RowsDropdown value={page_size} onChange={onPageSizeChange} />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={safe_page <= 1}
            onClick={() => onPageChange?.(safe_page - 1)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:border-cyan/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="min-w-24 text-center text-sm text-white/80">
            Page {safe_page} of {safe_pages}
          </span>
          <button
            type="button"
            disabled={safe_page >= safe_pages}
            onClick={() => onPageChange?.(safe_page + 1)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:border-cyan/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
