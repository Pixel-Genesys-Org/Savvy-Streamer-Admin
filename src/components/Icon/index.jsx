import { memo } from "react";

const Icon = ({ name, onClick, Icon, color = "blue", className }) => {
  const base_style = `
    w-9 h-9 
    flex items-center justify-center 
    rounded-full 
    cursor-pointer 
    transition 
    shadow-sm
    relative group
  `;

  const tooltip_style = `
    absolute -top-8 left-1/2 -translate-x-1/2 
    bg-secondary text-white text-xs px-2 py-1 rounded-md border border-white/10
    opacity-0 group-hover:opacity-100 transition 
    pointer-events-none z-10 whitespace-nowrap
  `;

  const color_classes = {
    red: "bg-error/15 text-error hover:bg-error/25",
    blue: "bg-cyan/15 text-cyan hover:bg-cyan/25",
    green: "bg-success/15 text-success hover:bg-success/25",
    yellow: "bg-yellow-400/15 text-yellow-300 hover:bg-yellow-400/25",
    indigo: "bg-primary/15 text-primary hover:bg-primary/25",
    gray: "bg-white/10 text-muted hover:bg-white/15",
  };

  return (
    <button
      onClick={onClick}
      className={`${base_style} ${color_classes[color] || ""} ${className}`}
      aria-label={name.toLowerCase()}
    >
      <span className={tooltip_style}>{name}</span>
      <Icon size={18} />
    </button>
  );
};

export default memo(Icon);
