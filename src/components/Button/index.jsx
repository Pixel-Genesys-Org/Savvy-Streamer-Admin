import React, { memo } from "react";
import Loader from "../Loader";

const Button = ({ onClick, Icon, disabled = false, text = "Button", type = "primary", outlined = false, loading = false, size = "" }) => {

    const base = "h-[42px] cursor-pointer flex items-center justify-center rounded-md px-6 py-2 border-2 transition-all duration-200 text-sm";

    const classes = {
        primary: {
            filled: "bg-primary text-white border-primary",
            outlined: "bg-white text-primary border-primary",
        },
        secondary: {
            filled: "bg-secondary text-white border-secondary",
            outlined: "bg-white text-secondary border-secondary",
        },
        muted: {
            filled: "bg-gray-200 text-secondary border-gray-200",
            outlined: "bg-white text-secondary border-gray-200",
        },
        danger: {
            filled: "bg-red-500 text-white border-red-500",
            outlined: "bg-white text-red-500 border-red-500",
        },
        success: {
            filled: "bg-green-500 text-white border-green-500",
            outlined: "bg-white text-green-500 border-green-500",
        },
        default: {
            filled: "bg-black text-white border-black",
            outlined: "bg-white text-black border-black",
        },
    };

    const width = {
        sm: "w-[120px]",
        md: "w-[200px]",
        lg: "w-full",
        "": "w-auto"
    }[size] || "w-auto";

    const selected = classes[type] || classes.default;
    const mode = outlined ? selected.outlined : selected.filled;

    const onPress = (e) => {
        e.preventDefault()
        onClick?.()
    }

    return (
        <button
            onClick={onPress}
            disabled={disabled || loading}
            className={`${base} ${mode} ${width} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {
                loading ?
                    <Loader color={mode} /> :
                    <>
                        {text}
                        {Icon && <Icon className={`ml-2 w-5 h-5`} />}
                    </>
            }
        </button>
    );
}

export default memo(Button)