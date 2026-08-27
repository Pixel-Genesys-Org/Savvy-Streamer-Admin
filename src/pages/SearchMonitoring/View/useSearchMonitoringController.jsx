import { useNavigate } from "react-router-dom"
import useFilters from "../../../middlewares/hooks/useFilters"
import { useGetAnalyticsQuery } from "../../../redux/Apis/Analytics"

const useSearchMonitoringController = () => {

    const navigate = useNavigate()

    const { data, isLoading } = useGetAnalyticsQuery({})

    const COLUMNS = [
        {
            label: 'Searched Title',
            key: 'name'
        },
        {
            label: 'Count',
            key: 'searched_count',
        },
    ]

    return {
        values: {
            columns: COLUMNS,
            data: data?.data || [],
            isLoading
        },
        functions: {
        }
    }

}

export default useSearchMonitoringController