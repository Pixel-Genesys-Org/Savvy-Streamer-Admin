import { useNavigate } from "react-router-dom"
import TableActions from "../../../components/TableActions"
import useFilters from "../../../middlewares/hooks/useFilters"
import { useGetFeedbacksQuery } from "../../../redux/Apis/Feedbacks"

const useViewFeedbacksController = () => {

    const navigate = useNavigate()
    const { search, setSearch } = useFilters()

    const { data, isLoading } = useGetFeedbacksQuery({ search })

    const COLUMNS = [
        {
            label: 'Name',
            key: 'name'
        },
        {
            label: 'Email',
            key: 'email',
        },
        {
            label: 'Subject',
            key: 'subject',
        },
        {
            label: 'Submission Date',
            type: "date",
            key: 'createdAt'
        },
        {
            label: 'Actions',
            key: 'actions',
            render: (row) => (
                <TableActions
                    onView={() => navigate(`/queries/${row._id}`)}
                />
            )
        }
    ]

    return {
        values: {
            columns: COLUMNS,
            data: data?.data || [],
            isLoading
        },
        functions: {
            onSearch: setSearch
        }
    }

}

export default useViewFeedbacksController