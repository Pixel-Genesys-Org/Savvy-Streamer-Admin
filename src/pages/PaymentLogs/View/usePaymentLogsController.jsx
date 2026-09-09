import { useState } from "react"
import Badge from "../../../components/Badge"
import ProfileViewer from "../../../components/ProfileViewer"
import useFilters from "../../../middlewares/hooks/useFilters"
import { useGetPaymentLogsQuery } from "../../../redux/apis/Package"
import { dateFormatter } from "../../../utils/helper"

const STATUS_FILTERS = [
    { label: "All", value: "" },
    { label: "Paid", value: "paid" },
    { label: "Failed", value: "failed" },
]

const formatPeriod = (start, end) => {
    if (!start && !end) return "—"

    const from = start ? dateFormatter(start, { time: false }) : "—"
    const to = end ? dateFormatter(end, { time: false }) : "—"

    return `${from} – ${to}`
}

const usePaymentLogsController = () => {

    const { search, setSearch, page, setPage, page_size, setPageSize } = useFilters()
    const [status, setStatusState] = useState("")

    const setStatus = (value) => {
        setStatusState(value)
        setPage(1)
    }

    const params = { search, page, page_size }
    if (status) params.status = status

    const { data, isLoading } = useGetPaymentLogsQuery(params)

    const COLUMNS = [
        {
            label: "User",
            render: (row) => (
                <ProfileViewer
                    name={row?.user?.name}
                    email={row?.user?.email}
                    picture={row?.user?.image_url}
                />
            )
        },
        {
            label: "Package",
            render: (row) => <p>{row?.package_name || "Subscription"}</p>
        },
        {
            label: "Amount",
            type: "price",
            key: "amount"
        },
        {
            label: "Status",
            render: (row) => (
                <Badge
                    type={row?.status === "paid" ? "success" : "danger"}
                    text={row?.status || "—"}
                />
            )
        },
        {
            label: "Billing Period",
            render: (row) => <p>{formatPeriod(row?.period_start, row?.period_end)}</p>
        },
        {
            label: "Date",
            type: "date",
            key: "createdAt"
        },
    ]

    return {
        values: {
            columns: COLUMNS,
            data: data?.data || [],
            isLoading,
            status,
            status_filters: STATUS_FILTERS,
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
            onSearch: setSearch,
            onStatusChange: setStatus,
        }
    }

}

export default usePaymentLogsController
