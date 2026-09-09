import LabelValue from "../../../components/LabelValue";
import DetailsPage from "../../../components/Wrappers/DetailsPage";
import { dateFormatter } from "../../../utils/helper";
import useViewFeedbacksDetailsController from "./useViewFeedbacksDetailsController";

const ViewFeedbacksDetails = () => {
  const { values } = useViewFeedbacksDetailsController();

  return (
    <DetailsPage title={"Query Details"} loading={values.isLoading}>
      <div className="glass-panel rounded-3xl p-5 sm:p-6">
        <div className="mb-4 grid grid-cols-1 gap-4 border-b border-white/10 pb-4 sm:grid-cols-2 lg:grid-cols-3">
          <LabelValue label={"Name"} value={values?.data?.name} />
          <LabelValue label={"Email"} value={values?.data?.email} />
          <LabelValue label={"Submitted On"} value={dateFormatter(values?.data?.createdAt)} />
        </div>
        <div className="mb-4">
          <h2 className="font-heading text-lg font-semibold text-white">Subject</h2>
          <p className="mt-1 text-white/80">{values?.data?.subject}</p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold text-white">Message</h2>
          <p className="mt-1 text-white/80">{values?.data?.message}</p>
        </div>
      </div>
    </DetailsPage>
  );
};

export default ViewFeedbacksDetails;
