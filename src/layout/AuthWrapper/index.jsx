import { memo } from "react";
import { images } from "../../assets";

const AuthWrapper = ({ children, title = "Title", subtitle = "Subtitle" }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
                <div className="px-8 pt-8 pb-4 text-center">
                    <img src={images.logo} alt="Savvy Streamer" className="mx-auto h-30 mb-8" />
                    <h2 className="text-2xl font-bold text-secondary">{title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                </div>
                <div className="px-8 pb-8">
                    {children}
                </div>
                <div className="px-8 pb-6 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Savvy Streamer. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default memo(AuthWrapper);
