import { memo } from "react";

const LabelValue = ({ label, value, full = false, capitalize = false }) => {
  return (
    <div className={full ? "col-span-1 sm:col-span-2 lg:col-span-3" : "col-span-1"}>
      <p className="text-sm font-medium tracking-wide text-muted">{label}</p>
      <p
        className={`mt-0.5 text-base font-semibold whitespace-pre-line text-white ${capitalize ? "capitalize" : ""}`}
      >
        {value}
      </p>
    </div>
  );
};

export default memo(LabelValue);
