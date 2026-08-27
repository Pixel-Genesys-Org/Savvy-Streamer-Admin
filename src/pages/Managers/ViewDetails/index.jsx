import Avatar from "../../../components/Avatar";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import LabelValue from "../../../components/LabelValue";
import DetailsPage from "../../../components/Wrappers/DetailsPage";
import useViewManagerDetailsController from "./useViewManagerDetailsController";

const Section = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">{title}</h2>
    <div className="grid grid-cols-3 gap-x-8 gap-y-4">{children}</div>
  </div>
);

const ViewManagerDetails = () => {

  const { values, functions } = useViewManagerDetailsController();
  const details = values?.data?.details || {};

  return (
    <DetailsPage title={"User Details"} loading={values.isLoading}>
      <div className="flex items-center justify-between mb-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center">
          <p className="text-sm font-medium text-gray-500 tracking-wide mr-3">Status</p>
          <Badge text={values?.data?.active ? "Active" : "Inactive"} type={values?.data?.active ? "success" : "danger"} />
        </div>
        <div className="flex gap-2">
          <Button
            text={values?.data?.active ? "Inactivate User" : "Activate User"}
            type={values?.data?.active ? "danger" : "success"}
            onClick={functions.toggleStatus}
          />
        </div>
      </div>
      <Section title="Basic Info">
        <div className="col-span-3 mb-4">
          <Avatar
            src={values?.data?.image_url}
            size="xl"
            name={values?.data?.name}
          />
        </div>
        <LabelValue label="Name" value={values?.data?.name} />
        <LabelValue label="Email" value={values?.data?.email} />
        <LabelValue label="Phone" value={values?.data?.phone ? `${values?.data?.dialing_code} ${values?.data?.phone}` : "-"} />
      </Section>
    </DetailsPage >
  );
};

export default ViewManagerDetails;
