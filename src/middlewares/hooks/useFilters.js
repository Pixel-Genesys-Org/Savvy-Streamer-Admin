import { useState } from "react";

const useFilters = (initial = {}) => {

    const [search, setSearchState] = useState(initial.search || "")
    const [page, setPage] = useState(initial.page || 1)
    const [page_size, setPageSizeState] = useState(initial.page_size || 10)

    const setSearch = (value) => {
        setSearchState(value)
        setPage(1)
    }

    const setPageSize = (value) => {
        setPageSizeState(value)
        setPage(1)
    }

    return {
        search,
        setSearch,
        page,
        setPage,
        page_size,
        setPageSize,
    }
}

export default useFilters
