import { useGetDashboardQuery } from "../../redux/Apis/General";
import { extractData } from "../../utils/storage"

const useDashboardController = () => {

    const user = extractData("user")

    const { data, isLoading } = useGetDashboardQuery()    

    return {
        values: {
            user_name: `${user?.name}`,
            data: data?.data || null,
            isLoading
        },
        functions: {
        },
    };
};

export default useDashboardController;