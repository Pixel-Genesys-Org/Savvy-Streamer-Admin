import { Plus } from "lucide-react";
import Button from "../Button";
import SearchBox from "../SearchBox";
import useDebouncedSearch from "../../middlewares/hooks/useDebouncedSearch";
import { useEffect } from "react";

const TableHeader = ({ title, onSearch, onCreate }) => {

    const [search, debouncedSearch, onChangeSearch] = useDebouncedSearch()
    const has_title = !!title;

    useEffect(() => {
        if (onSearch) {
            onSearch(debouncedSearch)
        }
    }, [debouncedSearch])

    return (
        <div
            className={`flex flex-col md:flex-row md:items-center ${has_title ? "justify-between" : "justify-end"} gap-3 mb-4`}
        >
            {
                has_title && (
                    <h2 className="text-2xl font-semibold uppercase text-secondary">
                        {title}
                    </h2>
                )
            }
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
                {
                    onSearch &&
                    <div className="w-full sm:w-[300px] md:w-[400px]">
                        <SearchBox value={search} onChange={onChangeSearch} />
                    </div>
                }
                {
                    onCreate &&
                    <div className="w-full sm:w-auto">
                        <Button
                            Icon={Plus}
                            text="Create New"
                            type="muted"
                            size="lg"
                            onClick={onCreate}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default TableHeader;
