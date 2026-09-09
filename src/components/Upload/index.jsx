import { memo, useEffect, useId, useState } from "react";

const Upload = ({ label, required, multiple = false, onChange, value }) => {
  const input_id = useId();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (value) {
      setFiles(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

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
      <label className="px-3 text-sm font-medium text-white">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <div
        className="mt-1 min-h-36 cursor-pointer rounded-2xl border-2 border-dashed border-white/15 bg-white/5 p-6 text-center transition-all hover:border-primary hover:bg-primary/10"
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
        <p className="text-muted">Click or drag files to upload</p>
        {files.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {files.map((file, idx) => (
              <div key={idx} className="group relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-32 w-full rounded-xl border border-white/10 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(idx);
                  }}
                  className="absolute top-1 right-1 cursor-pointer rounded-full bg-black/70 p-1 text-white opacity-0 transition group-hover:opacity-100"
                  title="Remove"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <p className="mt-1 truncate text-xs text-muted">{file.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Upload);
