import Table from "../../../components/Table"
import usePaymentLogsController from "./usePaymentLogsController"

const PaymentLogs = () => {
  const { values, functions } = usePaymentLogsController()

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {values.status_filters.map((item) => {
          const active = values.status === item.value
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => functions.onStatusChange(item.value)}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition ${
                active
                  ? "border-cyan/40 bg-gradient-to-r from-cyan/20 to-primary/20 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:border-primary/40 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <Table
        serial_number
        columns={values.columns}
        data={values.data}
        loading={values.isLoading}
        pagination={values.pagination}
        header={{
          title: "Payment Logs",
          onSearch: functions.onSearch,
        }}
      />
    </div>
  )
}

export default PaymentLogs
