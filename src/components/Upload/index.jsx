import { memo, useEffect, useId, useState } from "react";

const Upload = ({ label, required, multiple = false, onChange, value }) => {

    const input_id = useId()
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (value) {
            setFiles(Array.isArray(value) ? value : [value]);
        }
    }, [value])

    const handleFiles = (selectedFiles) => {
        const fileList = Array.from(selectedFiles);
        const imageFiles = fileList.filter((file) => file.type.startsWith("image/"));
        setFiles(imageFiles);
        if (onChange) onChange(imageFiles);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleInputChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleRemove = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
        if (onChange) onChange(updatedFiles);
    };

    return (
        <div>
            <label className="text-sm font-medium text-secondary px-3">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div
                className="border-2 border-dashed border-gray-300 rounded-md p-6 min-h-36 text-center cursor-pointer hover:border-primary transition-all mt-1"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById(input_id).click()}
            >
                <input
                    id={input_id}
                    type="file"
                    className="hidden"
                    onChange={handleInputChange}
                    multiple={multiple}
                    accept="image/*"
                />
                <p className="text-gray-600">Click or drag files to upload</p>
                {files.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {files.map((file, idx) => (
                            <div key={idx} className="relative group">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-full h-32 object-cover rounded-xl border"
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(idx);
                                    }}
                                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                                    title="Remove"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <p className="mt-1 text-xs text-gray-500 truncate">{file.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(Upload);
