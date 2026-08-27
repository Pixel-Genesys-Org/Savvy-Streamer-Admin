import { memo } from "react"

const types = {
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
    primary: "bg-primary/10 text-primary",
}

const Badge = ({ type = "primary", text }) => {

    const classes = types[type] || types.primary

    return (
        <span className={`inline-block px-4 py-0.5 rounded text-sm font-medium capitalize ${classes}`}>
            {text}
        </span>
    )
}

export default memo(Badge)
