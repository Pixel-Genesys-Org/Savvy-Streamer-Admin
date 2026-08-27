import { memo } from "react"

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
    bg-black text-white text-xs px-2 py-1 rounded 
    opacity-0 group-hover:opacity-100 transition 
    pointer-events-none z-10 whitespace-nowrap
  `;

  const color_classes = {
    red: "bg-red-50 text-red-500 hover:bg-red-100",
    blue: "bg-blue-50 text-blue-500 hover:bg-blue-100",
    green: "bg-green-50 text-green-500 hover:bg-green-100",
    yellow: "bg-yellow-50 text-yellow-500 hover:bg-yellow-100",
    indigo: "bg-indigo-50 text-indigo-500 hover:bg-indigo-100",
  }

  return (
    <button
      onClick={onClick}
      className={`${base_style} ${color_classes[color] || ""} ${className}`}
      aria-label={name.toLowerCase()}
    >
      <span className={tooltip_style}>{name}</span>
      <Icon size={18} />
    </button>
  )
}

export default memo(Icon)