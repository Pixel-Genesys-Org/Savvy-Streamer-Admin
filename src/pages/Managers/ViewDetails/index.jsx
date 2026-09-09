import Avatar from "../../../components/Avatar";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import LabelValue from "../../../components/LabelValue";
import DetailsPage from "../../../components/Wrappers/DetailsPage";
import useViewManagerDetailsController from "./useViewManagerDetailsController";

const Section = ({ title, children }) => (
  <div className="glass-panel mb-6 rounded-3xl p-5 sm:p-6">
    <h2 className="font-heading mb-4 border-b border-white/10 pb-2 text-lg font-bold text-white">
      {title}
    </h2>
    <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  </div>
);

const ViewManagerDetails = () => {
  const { values, functions } = useViewManagerDetailsController();

  return (
    <DetailsPage title={"User Details"} loading={values.isLoading}>
      <div className="glass-panel mb-6 flex flex-col items-start justify-between gap-4 rounded-3xl p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-center">
          <p className="mr-3 text-sm font-medium tracking-wide text-muted">Status</p>
          <Badge
            text={values?.data?.active ? "Active" : "Inactive"}
            type={values?.data?.active ? "success" : "danger"}
          />
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <Button
            text={values?.data?.active ? "Inactivate User" : "Activate User"}
            type={values?.data?.active ? "danger" : "success"}
            onClick={functions.toggleStatus}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
      <Section title="Basic Info">
        <div className="col-span-1 mb-2 sm:col-span-2 lg:col-span-3">
          <Avatar src={values?.data?.image_url} size="xl" name={values?.data?.name} />
        </div>
        <LabelValue label="Name" value={values?.data?.name} />
        <LabelValue label="Email" value={values?.data?.email} />
        <LabelValue
          label="Phone"
          value={values?.data?.phone ? `${values?.data?.dialing_code} ${values?.data?.phone}` : "-"}
        />
      </Section>
    </DetailsPage>
  );
};

export default ViewManagerDetails;
