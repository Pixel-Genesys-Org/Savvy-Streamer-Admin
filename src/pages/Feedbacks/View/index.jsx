import Table from "../../../components/Table";
import useViewFeedbacksController from "./useViewFeedbacksController";

const ViewFeedbacks = () => {

  const { values, functions } = useViewFeedbacksController()

  return (
    <Table
      serial_number
      columns={values.columns}
      data={values?.data}
      loading={values.isLoading}
      header={{
        title: "Queries Management",
        onSearch: functions.onSearch
      }}
    />
  )

}

export default ViewFeedbacks;
