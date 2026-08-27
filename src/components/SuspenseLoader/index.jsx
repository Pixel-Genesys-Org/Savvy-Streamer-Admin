import "./index.css";
import { images } from "../../assets"

const SuspenseLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white space-y-6 px-4">
            <img src={images.logo} alt="logo" className="h-30 object-contain" />
            <div className="loader-bars flex space-x-1">
                <div className="bar bar1" />
                <div className="bar bar2" />
                <div className="bar bar3" />
                <div className="bar bar4" />
            </div>
        </div>
    );
};

export default SuspenseLoader;

