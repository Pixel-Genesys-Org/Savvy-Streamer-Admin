import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";

const DetailsPage = ({ title, children, loading = false, back = true }) => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="mx-auto">
      <div className="mb-6 flex items-center gap-3">
        {back && (
          <button
            type="button"
            onClick={goBack}
            className="cursor-pointer rounded-full border border-white/10 bg-white/5 p-2 transition hover:border-primary/40 hover:bg-primary/15"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <h1 className="font-heading text-xl font-bold text-white sm:text-2xl">{title}</h1>
      </div>
      {loading ? <Loader center size={48} /> : children}
    </div>
  );
};

export default DetailsPage;
