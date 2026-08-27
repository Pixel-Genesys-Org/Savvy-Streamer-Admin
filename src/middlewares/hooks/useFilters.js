import { useEffect, useState } from "react";

const useFilters = (initial = {}) => {

    const [search, setSearch] = useState(initial.search || "")
    const [pageStart, setPageStart] = useState(initial.page || 0)
    const [limit, setLimit] = useState(initial.rowsPerPage || 10)

    useEffect(() => {
        if (search) {
            setPageStart(0)
        }
    }, [search])

    return {
        search,
        setSearch,
        page_start: pageStart,
        setPageStart,
        limit,
        setLimit,
    }
}

export default useFilters
