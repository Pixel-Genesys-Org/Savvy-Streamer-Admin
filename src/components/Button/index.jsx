import { memo } from "react";
import Loader from "../Loader";

const Button = ({
  onClick,
  Icon,
  disabled = false,
  text = "Button",
  type = "primary",
  outlined = false,
  loading = false,
  size = "",
  className = "",
}) => {
  const base =
    "h-[44px] cursor-pointer flex items-center justify-center rounded-full px-6 py-2 border transition-all duration-200 text-sm font-semibold tracking-wide";

  const classes = {
    primary: {
      filled:
        "btn-gradient text-white border-transparent shadow-[0_8px_24px_rgba(197,99,255,0.25)]",
      outlined: "bg-transparent text-primary border-primary hover:bg-primary/10",
    },
    secondary: {
      filled: "bg-white text-secondary border-white hover:bg-white/90",
      outlined: "bg-transparent text-white border-white/30 hover:bg-white/10",
    },
    muted: {
      filled: "bg-white/10 text-white border-white/10 hover:bg-white/15",
      outlined: "bg-transparent text-muted border-white/15 hover:bg-white/10",
    },
    danger: {
      filled: "bg-error text-white border-error hover:brightness-110",
      outlined: "bg-transparent text-error border-error hover:bg-error/10",
    },
    success: {
      filled: "bg-success text-secondary border-success hover:brightness-110",
      outlined: "bg-transparent text-success border-success hover:bg-success/10",
    },
    default: {
      filled: "bg-white text-secondary border-white",
      outlined: "bg-transparent text-white border-white/30",
    },
  };

  const width =
    {
      sm: "w-[120px]",
      md: "w-[200px]",
      lg: "w-full",
      "": "w-auto",
    }[size] || "w-auto";

  const selected = classes[type] || classes.default;
  const mode = outlined ? selected.outlined : selected.filled;

  const onPress = (e) => {
    e.preventDefault();
    onClick?.();
  };

  return (
    <button
      onClick={onPress}
      disabled={disabled || loading}
      className={`${base} ${mode} ${width} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"} ${className}`}
    >
      {loading ? (
        <Loader color="white" />
      ) : (
        <>
          {text}
          {Icon && <Icon className="ml-2 h-5 w-5" />}
        </>
      )}
    </button>
  );
};

export default memo(Button);
