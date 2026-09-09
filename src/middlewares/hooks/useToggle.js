const { useState, useCallback } = require("react")

const useToggle = (initial = false) => {

    const [open, setOpen] = useState(initial)

    const toggle = useCallback(() => {
        setOpen(!open)
    }, [open])

    return [open, toggle]

}

export default useToggle