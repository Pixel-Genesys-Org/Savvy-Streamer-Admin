import { memo } from 'react';

const Checkbox = ({
    label,
    required,
    onChange,
    value,
    disabled = false,
}) => {
    return (
        <div className={`w-full text-left`}>
            {
                label &&
                <label className="text-sm font-medium text-secondary px-3">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            }
            <div
                className={`relative px-3 mt-1 py-2.5 flex items-center`}
            >
                <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="form-checkbox h-4 w-4 transition duration-150 ease-in-out border-gray-300 rounded accent-primary cursor-pointer"
                />
            </div>
        </div>
    );
};

export default memo(Checkbox)