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
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;
  const isTextarea = type === "textarea";

  return (
    <div className="w-full text-left">
      {label && (
        <label className="px-3 text-sm font-medium text-white">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div
        className={`relative mt-1 border px-4 transition-all duration-200 ${
          isTextarea ? "rounded-2xl py-3" : "flex items-center rounded-full py-2.5"
        } ${
          disabled
            ? "border-white/10 bg-white/5"
            : error
              ? "border-error/60 bg-white/5"
              : "border-white/15 bg-white/5 focus-within:border-cyan/60 focus-within:shadow-[0_0_0_3px_rgba(107,224,254,0.12)]"
        }`}
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
            className="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/40 disabled:cursor-not-allowed"
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
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40 disabled:cursor-not-allowed"
              maxLength={max}
            />

            {type === "password" ? (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 cursor-pointer text-white/70 transition hover:text-cyan"
              >
                {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            ) : (
              Icon && <Icon size={18} className="ml-2 text-cyan" />
            )}
          </>
        )}
      </div>
      {error && <p className="mt-1 px-3 text-sm text-error">{error}</p>}
    </div>
  );
};

export default memo(Input);
