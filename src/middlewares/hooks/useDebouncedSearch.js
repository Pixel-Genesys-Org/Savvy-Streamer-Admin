import { useEffect, useState, useCallback } from "react"

const useDebouncedSearch = (initialValue = "", delay = 500) => {

    const [value, setValue] = useState(initialValue)
    const [debouncedValue, setDebouncedValue] = useState(initialValue)

    useEffect(() => {

        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(handler)

    }, [value, delay])

    const onChange = useCallback((e) => {
        setValue(e)
    }, [])

    return [value, debouncedValue, onChange]
}

export default useDebouncedSearch
