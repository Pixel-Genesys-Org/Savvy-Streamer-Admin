import { Clapperboard } from "lucide-react"
import Badge from "../../../components/Badge"
import useFilters from "../../../middlewares/hooks/useFilters"
import { useGetAnalyticsQuery } from "../../../redux/apis/Analytics"

const RankBadge = ({ rank }) => {
    const styles = {
        1: "border-yellow-400/40 bg-yellow-400/20 text-yellow-300",
        2: "border-white/25 bg-white/15 text-white",
        3: "border-orange-400/40 bg-orange-400/20 text-orange-300",
    }

    return (
        <span
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                styles[rank] || "border-white/10 bg-white/5 text-white/70"
            }`}
        >
            {rank}
        </span>
    )
}

const ShowTitle = ({ name, poster }) => (
    <div className="flex min-w-[180px] items-center gap-3">
        <div className="h-16 w-11 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
            {poster ? (
                <img src={poster} alt={name} className="h-full w-full object-cover" />
            ) : (
                <div className="flex h-full w-full items-center justify-center text-muted">
                    <Clapperboard size={16} />
                </div>
            )}
        </div>
        <p className="truncate font-medium text-white">{name || "-"}</p>
    </div>
)

const useSearchMonitoringController = () => {

    const { page, setPage, page_size, setPageSize } = useFilters()

    const { data, isLoading } = useGetAnalyticsQuery({ page, page_size })

    const rows = (data?.data || []).map((item, index) => ({
        ...item,
        rank: (page - 1) * page_size + index + 1,
    }))

    const COLUMNS = [
        {
            label: "Rank",
            render: (row) => <RankBadge rank={row.rank} />,
        },
        {
            label: "Show",
            render: (row) => <ShowTitle name={row?.name} poster={row?.poster_url} />,
        },
        {
            label: "Type",
            render: (row) => (
                <Badge
                    type={row?.type === "tv" ? "primary" : "info"}
                    text={row?.type === "tv" ? "TV Show" : "Movie"}
                />
            ),
        },
        {
            label: "Last Search",
            type: "date",
            key: "last_searched",
        },
        {
            label: "Count",
            key: "searched_count",
        },
    ]

    return {
        values: {
            columns: COLUMNS,
            data: rows,
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
        }
    }

}

export default useSearchMonitoringController
