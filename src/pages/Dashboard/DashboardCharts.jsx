import { useMemo } from "react"
import ChartCanvas from "../../components/ChartCanvas"
import { formatCurrency } from "../../utils/helper"

const EMPTY_REVENUE = []
const EMPTY_USER_TYPES = { free: 0, premium: 0 }

const COLORS = {
  cyan: "#6BE0FE",
  purple: "#C563FF",
  muted: "#9CA3AF",
  grid: "rgba(255,255,255,0.08)",
  tooltipBg: "#1F1D33",
}

const baseOptions = {
  plugins: {
    legend: {
      labels: {
        color: COLORS.muted,
        boxWidth: 12,
        font: { family: "DM Sans", size: 12 },
      },
    },
    tooltip: {
      backgroundColor: COLORS.tooltipBg,
      borderColor: "rgba(197,99,255,0.28)",
      borderWidth: 1,
      titleColor: "#ffffff",
      bodyColor: "#ffffff",
      padding: 10,
    },
  },
}

const ChartPanel = ({ title, children, className = "" }) => (
  <div className={`glass-panel rounded-3xl p-5 ${className}`}>
    <p className="mb-4 font-heading text-lg font-semibold text-white">{title}</p>
    <div className="relative h-72">{children}</div>
  </div>
)

const EmptyState = ({ text }) => (
  <div className="flex h-full items-center justify-center text-sm text-muted">{text}</div>
)

const RevenueChart = ({ points = [] }) => {
  const hasData = points.some((item) => item.amount > 0)

  const data = useMemo(
    () => ({
      labels: points.map((item) => item.label),
      datasets: [
        {
          label: "Revenue",
          data: points.map((item) => item.amount),
          borderColor: COLORS.cyan,
          backgroundColor: "rgba(107, 224, 254, 0.18)",
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: COLORS.purple,
          pointBorderColor: COLORS.cyan,
          borderWidth: 2,
        },
      ],
    }),
    [points]
  )

  const options = useMemo(
    () => ({
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        legend: { display: false },
        tooltip: {
          ...baseOptions.plugins.tooltip,
          callbacks: {
            label: (context) => formatCurrency(context.parsed.y || 0),
          },
        },
      },
      scales: {
        x: {
          ticks: { color: COLORS.muted, maxRotation: 0 },
          grid: { color: COLORS.grid, drawBorder: false },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: COLORS.muted,
            callback: (value) => `$${Number(value).toFixed(0)}`,
          },
          grid: { color: COLORS.grid, drawBorder: false },
        },
      },
    }),
    []
  )

  return (
    <ChartPanel title="Revenue over time" className="xl:col-span-2">
      {hasData ? <ChartCanvas type="line" data={data} options={options} /> : <EmptyState text="No paid revenue yet" />}
    </ChartPanel>
  )
}

const UserTypeChart = ({ free = 0, premium = 0 }) => {
  const hasData = free + premium > 0

  const data = useMemo(
    () => ({
      labels: ["Free", "Premium"],
      datasets: [
        {
          data: [free, premium],
          backgroundColor: ["rgba(107, 224, 254, 0.75)", "rgba(197, 99, 255, 0.8)"],
          borderColor: ["#6BE0FE", "#C563FF"],
          borderWidth: 1,
          hoverOffset: 6,
        },
      ],
    }),
    [free, premium]
  )

  const options = useMemo(
    () => ({
      ...baseOptions,
      cutout: "68%",
      plugins: {
        ...baseOptions.plugins,
        legend: {
          position: "bottom",
          labels: {
            ...baseOptions.plugins.legend.labels,
            padding: 16,
          },
        },
      },
    }),
    []
  )

  return (
    <ChartPanel title="Free vs Premium">
      {hasData ? (
        <ChartCanvas type="doughnut" data={data} options={options} />
      ) : (
        <EmptyState text="No user type data yet" />
      )}
    </ChartPanel>
  )
}

const TopSearchesChart = ({ titles = [] }) => {
  const hasData = titles.length > 0

  const data = useMemo(
    () => ({
      labels: titles.map((item) => item.name),
      datasets: [
        {
          label: "Searches",
          data: titles.map((item) => item.searched_count),
          backgroundColor: "rgba(197, 99, 255, 0.72)",
          borderColor: COLORS.cyan,
          borderWidth: 1,
          borderRadius: 8,
          barThickness: 18,
        },
      ],
    }),
    [titles]
  )

  const options = useMemo(
    () => ({
      ...baseOptions,
      indexAxis: "y",
      plugins: {
        ...baseOptions.plugins,
        legend: { display: false },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { color: COLORS.muted, precision: 0 },
          grid: { color: COLORS.grid, drawBorder: false },
        },
        y: {
          ticks: { color: "#ffffff", autoSkip: false },
          grid: { display: false, drawBorder: false },
        },
      },
    }),
    []
  )

  return (
    <ChartPanel title="Top searched titles">
      {hasData ? (
        <ChartCanvas type="bar" data={data} options={options} />
      ) : (
        <EmptyState text="No search data yet" />
      )}
    </ChartPanel>
  )
}

const DashboardCharts = ({ charts }) => {
  const revenue = charts?.revenue_over_time || EMPTY_REVENUE
  const userTypes = charts?.user_types || EMPTY_USER_TYPES

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 xl:grid-cols-3">
      <RevenueChart points={revenue} />
      <UserTypeChart free={userTypes.free} premium={userTypes.premium} />
    </div>
  )
}

export { TopSearchesChart }
export default DashboardCharts
