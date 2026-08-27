import Table from "../../../components/Table";
import useViewEmployeesController from "./useViewEmployeesController";

const ViewEmployees = () => {

  const { values, functions } = useViewEmployeesController()

  return (
    <Table
      serial_number
      columns={values.columns}
      data={values?.data}
      loading={values.isLoading}
      header={{
        title: "Users Management",
        onCreate: functions.handleAddEdit,
        onSearch: functions.onSearch
      }}
    />
  )

}

export default ViewEmployees
