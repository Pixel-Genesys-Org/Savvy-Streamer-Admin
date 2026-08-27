import Table from "../../../components/Table";
import useViewManagerController from "./useViewManagerController";

const ViewManagers = () => {

  const { values, functions } = useViewManagerController()

  return (
    <Table
      serial_number
      columns={values.columns}
      data={values?.data}
      loading={values.isLoading}
      header={{
        title: "User Requests",
        onCreate: functions.handleAddEdit,
        onSearch: functions.onSearch
      }}
    />
  )

}

export default ViewManagers
