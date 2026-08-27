import Table from "../../../components/Table";
import useSearchMonitoringController from "./useSearchMonitoringController";

const SearchMonitoring = () => {

  const { values, functions } = useSearchMonitoringController()

  return (
    <Table
      serial_number
      columns={values.columns}
      data={values?.data}
      loading={values.isLoading}
      header={{
        title: "Search Monitoring",
      }}
    />
  )

}

export default SearchMonitoring;
