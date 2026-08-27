import { Calendar, Mail, User } from "lucide-react";
import DetailsPage from "../../../components/Wrappers/DetailsPage";
import { dateFormatter } from "../../../utils/helper";
import useViewFeedbacksDetailsController from "./useViewFeedbacksDetailsController";
import LabelValue from "../../../components/LabelValue";

const ViewFeedbacksDetails = () => {

  const { values } = useViewFeedbacksDetailsController()

  return (
    <DetailsPage title={"Query Details"} loading={values.isLoading}>
      <div className="grid grid-cols-3 space-y-2 border-b pb-4 mb-4 border-b-gray-200">
        <LabelValue label={"Name"} value={values?.data?.name} />
        <LabelValue label={"Email"} value={values?.data?.email} />
        <LabelValue label={"Submitted On"} value={dateFormatter(values?.data?.createdAt)} />
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Subject</h2>
        <p className="text-gray-800">{values?.data?.subject}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Message</h2>
        <p className="text-gray-800">{values?.data?.message}</p>
      </div>
    </DetailsPage>
  )

}

export default ViewFeedbacksDetails;
