import { useNavigate } from "react-router-dom"
import TableActions from "../../../components/TableActions"
import useFilters from "../../../middlewares/hooks/useFilters"
import { useGetFeedbacksQuery } from "../../../redux/apis/Feedbacks"

const useViewFeedbacksController = () => {

    const navigate = useNavigate()
    const { search, setSearch, page, setPage, page_size, setPageSize } = useFilters()

    const { data, isLoading } = useGetFeedbacksQuery({ search, page, page_size })

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
            isLoading,
            pagination: {
                page,
                page_size,
                total: data?.pagination?.total ?? 0,
                total_pages: data?.pagination?.total_pages || 1,
                onPageChange: setPage,
                onPageSizeChange: setPageSize,
            }
        },
        functions: {
            onSearch: setSearch
        }
    }

}

export default useViewFeedbacksController