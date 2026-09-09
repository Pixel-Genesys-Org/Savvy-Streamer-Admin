import { memo } from "react";

const types = {
  success: "bg-success/15 text-success",
  danger: "bg-error/15 text-error",
  warning: "bg-yellow-400/15 text-yellow-300",
  info: "bg-cyan/15 text-cyan",
  primary: "bg-primary/15 text-primary",
};

const Badge = ({ type = "primary", text }) => {
  const classes = types[type] || types.primary;

  return (
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium capitalize sm:px-4 sm:text-sm ${classes}`}
    >
      {text}
    </span>
  );
};

export default memo(Badge);
