import { Eye, EyeOff } from "lucide-react";
import { memo, useState } from "react";

const Input = ({
    label,
    placeholder,
    value,
    onChange,
    type = "text",
    icon: Icon,
    required = false,
    error,
    rows = 4,
    onBlur,
    name,
    ref,
    max,
    disabled = false
}) => {

    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === "password" && showPassword ? "text" : type;
    const isTextarea = type === "textarea";

    return (
        <div className="w-full text-left">
            {
                label &&
                <label className="text-sm font-medium text-secondary px-3">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            }
            <div
                className={`relative px-3 mt-1 bg-white border border-gray-300 rounded-md ${isTextarea ? "py-2" : "py-2.5 flex items-center"}`}
            >
                {isTextarea ? (
                    <textarea
                        disabled={disabled}
                        ref={ref}
                        rows={rows}
                        placeholder={placeholder ? placeholder : label ? `Enter ${label}` : ""}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-sm resize-none"
                        maxLength={max}
                    />
                ) : (
                    <>
                        <input
                            disabled={disabled}
                            ref={ref}
                            type={inputType}
                            placeholder={placeholder ? placeholder : label ? `Enter ${label}` : ""}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            name={name}
                            className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-sm"
                            maxLength={max}
                        />

                        {type === "password" ? (
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="ml-2 text-secondary cursor-pointer"
                            >
                                {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        ) : (
                            Icon && <Icon size={18} className="ml-2 text-secondary" />
                        )}
                    </>
                )}
            </div>
            {error && (
                <p className="text-red-500 mt-1 text-sm px-3">{error}</p>
            )}
        </div>
    )
}

export default memo(Input);
