import { Loader2 } from "lucide-react"
import { memo } from "react"

const COLOR_MAP = {
    primary: "text-primary",
    white: "text-white",
    cyan: "text-cyan",
    muted: "text-muted",
}

const Loader = ({ size = 24, color = "primary", center = false, type = "spinner" }) => {

    const colorClass = COLOR_MAP[color] || COLOR_MAP.primary

    const spinner = (
        <Loader2 size={size} className={`animate-spin ${colorClass}`} />
    )

    const circular = (
        <svg
            className={`animate-spin ${colorClass}`}
            width={size}
            height={size}
            viewBox="0 0 50 50"
        >
            <circle
                className="text-primary"
                cx="25"
                cy="25"
                r="20"
                stroke="currentColor"
                strokeWidth="5"
                fill="none"
            />
            <circle
                className="text-current"
                cx="25"
                cy="25"
                r="20"
                stroke="currentColor"
                strokeWidth="5"
                strokeDasharray="90"
                strokeDashoffset="60"
                fill="none"
                strokeLinecap="round"
            />
        </svg>
    )

    const loader = type === "circular" ? circular : spinner

    if (center) {
        return (
            <div className="flex items-center justify-center">
                {loader}
            </div>
        )
    }

    return loader
}

export default memo(Loader)
