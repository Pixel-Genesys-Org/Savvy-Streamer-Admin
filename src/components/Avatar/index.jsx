import { memo } from "react";
import { getInitialDetails } from "../../utils/helper";

const Avatar = ({ src, name = "", size = "md" }) => {
  const sizes = {
    sm: 36,
    md: 48,
    lg: 64,
    xl: 100,
  }[size];

  const details = getInitialDetails(name);

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full border border-white/10 font-semibold ${details?.theme} text-lg`}
      style={{ height: sizes, width: sizes }}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        details?.initials
      )}
    </div>
  );
};

export default memo(Avatar);
