import { memo } from "react";

const Checkbox = ({ label, required, onChange, value, disabled = false }) => {
  return (
    <div className="w-full text-left">
      {label && (
        <label className="px-3 text-sm font-medium text-white">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative mt-1 flex items-center px-3 py-2.5">
        <input
          type="checkbox"
          checked={value}
          onChange={onChange}
          disabled={disabled}
          className="form-checkbox h-4 w-4 cursor-pointer rounded border-white/20 accent-primary transition duration-150 ease-in-out"
        />
      </div>
    </div>
  );
};

export default memo(Checkbox);
