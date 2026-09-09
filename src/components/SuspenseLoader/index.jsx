import { images } from "../../assets";
import "./index.css";

const SuspenseLoader = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 bg-secondary px-4">
      <img src={images.logo} alt="logo" className="h-24 animate-float object-contain sm:h-28" />
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
