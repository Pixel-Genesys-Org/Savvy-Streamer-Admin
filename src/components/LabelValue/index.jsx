import { memo } from "react"

const LabelValue = ({ label, value, full = false, capitalize = false }) => {
    return (
        <div className={full ? "col-span-3" : "col-span-1"}>
            <p className="text-sm font-medium text-gray-500 tracking-wide">
                {label}
            </p>
            <p className={`mt-0.5 text-base font-semibold text-gray-900 whitespace-pre-line ${capitalize ? "capitalize" : ""}`}>
                {value}
            </p>
        </div>
    )
}

export default memo(LabelValue)