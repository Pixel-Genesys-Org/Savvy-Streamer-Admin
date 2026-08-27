import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";

const DetailsPage = ({ title, children, loading = false, back = true }) => {

    const navigate = useNavigate()

    const goBack = () => navigate(-1)

    return (
        <div className="mx-auto">
            <div className="flex items-center gap-3 mb-6">
                {back && <button onClick={goBack} className="p-2 rounded hover:bg-gray-100 cursor-pointer">
                    <ArrowLeft className="w-5 h-5" />
                </button>}
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            {
                loading ? <Loader center size={48} /> : children
            }
        </div>
    );
};

export default DetailsPage;
