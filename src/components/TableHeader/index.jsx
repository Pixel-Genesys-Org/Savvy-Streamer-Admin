import { Plus } from "lucide-react";
import { useEffect } from "react";
import useDebouncedSearch from "../../middlewares/hooks/useDebouncedSearch";
import Button from "../Button";
import SearchBox from "../SearchBox";

const TableHeader = ({ title, onSearch, onCreate }) => {
  const [search, debouncedSearch, onChangeSearch] = useDebouncedSearch();
  const has_title = !!title;

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <div
      className={`mb-5 flex flex-col gap-3 md:flex-row md:items-center ${has_title ? "justify-between" : "justify-end"}`}
    >
      {has_title && (
        <h2 className="font-heading text-xl font-semibold tracking-wide text-white sm:text-2xl">
          {title}
        </h2>
      )}
      <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center md:w-auto">
        {onSearch && (
          <div className="w-full sm:w-[280px] md:w-[360px]">
            <SearchBox value={search} onChange={onChangeSearch} />
          </div>
        )}
        {onCreate && (
          <div className="w-full sm:w-auto">
            <Button Icon={Plus} text="Create New" type="muted" size="lg" onClick={onCreate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableHeader;
