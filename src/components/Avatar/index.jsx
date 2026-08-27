import { memo } from "react";
import { getInitialDetails } from "../../utils/helper";

const Avatar = ({ src, name = "", size = "md" }) => {

    const sizes = {
        sm: 36,
        md: 48,
        lg: 64,
        xl: 100
    }[size]

    const details = getInitialDetails(name)

    return (
        <div
            className={`rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-semibold overflow-hidden ${details?.theme} text-lg`}
            style={{ height: sizes, width: sizes }}
        >
            {src ? (
                <img
                    src={src}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            ) : (
                details?.initials
            )}
        </div>
    );
};

export default memo(Avatar)
