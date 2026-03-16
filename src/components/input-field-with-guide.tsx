import { ChevronDown, FileText, Upload, X } from "lucide-react";
import type { ChangeEvent } from "react";

type inputFieldWithGuideProps = {
  icon?: React.ReactNode;
  title: string;
  required?: boolean;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  guideText?: string;
  type?: string;
  value?: string | number | null;
  option?: options[];
  inputBgColor?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  error?: string;
  rowSpan?: number;
  fileInputRef?: React.RefObject<HTMLInputElement>;
  dragging?: boolean;
  setDragging?: React.Dispatch<React.SetStateAction<boolean>>;
  handleDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  preview?: string | null;
  setPreview?: React.Dispatch<React.SetStateAction<string | null>>;
  setImage?: React.Dispatch<React.SetStateAction<File | null>>;
};

type options = {
  id: number;
  value: string;
};

export default function InputFieldWithGuide({
  icon,
  title,
  required,
  maxLength,
  min,
  max,
  guideText,
  type,
  value,
  option,
  inputBgColor,
  onChange,
  error,
  rowSpan,
  fileInputRef,
  dragging,
  setDragging,
  handleDrop,
  preview,
  setPreview,
  setImage,
}: inputFieldWithGuideProps) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <label className="text-sm font-bold text-black flex items-center gap-2">
        {icon ? icon : <FileText className="w-4 h-4 text-blue-900" />}
        {title} {required && <span className="text-red-600">*</span>}
      </label>
      {guideText && <p className="text-sm text-gray-500">{guideText}</p>}
      <div className="mt-auto">
        {fieldType({
          type,
          title,
          value,
          option,
          maxLength,
          min,
          max,
          onChange,
          inputBgColor,
          rowSpan,
          fileInputRef,
          dragging,
          setDragging,
          handleDrop,
          preview,
          setPreview,
          setImage,
        })}
      </div>
      {type === "textarea" || type === "text" ? (
        <p className="text-sm text-gray-500">
          {value ? value.toString().length : 0} / {maxLength ?? 200} characters
        </p>
      ) : null}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

function fieldType({
  type,
  title,
  value,
  option,
  maxLength,
  min,
  max,
  onChange,
  inputBgColor,
  rowSpan,
  fileInputRef,
  dragging,
  setDragging,
  handleDrop,
  preview,
  setPreview,
  setImage,
}: inputFieldWithGuideProps) {
  const handleImageChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
  ) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    const file = e.target.files?.[0];
    if (!file) return;

    setImage?.(file);
    setPreview?.(URL.createObjectURL(file));
  };
  switch (type) {
    case "text":
    case "number":
    case "email":
    case "password":
    case "date":
    case "time":
      return (
        <input
          type={type}
          placeholder={"Enter " + title}
          maxLength={maxLength}
          className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jci-primary ${inputBgColor || ""}`}
          value={value ?? ""}
          onChange={onChange}
          min={min}
          max={max}
        />
      );
    case "textarea":
      return (
        <textarea
          placeholder={"Enter " + title}
          maxLength={maxLength}
          className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jci-primary ${inputBgColor || ""}`}
          value={value ?? ""}
          onChange={onChange}
          rows={rowSpan ?? 4}
        />
      );
    case "checkbox":
      return (
        <div
          className={`flex align-middle w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jci-primary ${inputBgColor || ""}`}
        >
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={value === "true"}
              onChange={(e) =>
                onChange &&
                onChange({
                  ...e,
                  target: {
                    ...e.target,
                    value: e.target.checked ? "true" : "false",
                  },
                } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
              }
            />
            <div
              className="relative w-11 h-6 bg-gray-200 rounded-full
                  peer
                  peer-focus:outline-none
                  peer-focus:ring-2 peer-focus:ring-primary/50
                  after:content-['']
                  rtl:peer-checked:after:-translate-x-full
                  peer-checked:after:border-white
                  after:absolute
                  after:top-0.5 after:left-0.5
                  after:bg-white
                  after:border after:border-gray-300
                  after:rounded-full
                  after:h-5 after:w-5
                  after:transition-all
                  peer-checked:after:translate-x-full
                  peer-checked:bg-jci-primary
                "
            ></div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {value === "true" ? "Visible" : "Hidden"}
            </span>
          </label>
        </div>
      );
    case "radio":
      return (
        <input
          type="radio"
          className={`w-5 h-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jci-primary ${inputBgColor || ""}`}
          checked={value === "true"}
          onChange={(e) =>
            onChange &&
            onChange({
              ...e,
              target: {
                ...e.target,
                value: e.target.checked ? "true" : "false",
              },
            } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
          }
        />
      );
    case "dropdown":
      return (
        <div className="relative">
          <select
            className={`w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jci-primary appearance-none ${inputBgColor || ""}`}
            value={value ?? ""}
            onChange={onChange}
          >
            <option value="" disabled>
              Select {title}
            </option>
            {option &&
              option.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.value}
                </option>
              ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      );

    case "file":
      return (
        <div className="space-y-1.5">
          <div
            onClick={() => fileInputRef?.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging?.(true);
            }}
            onDragLeave={() => setDragging?.(false)}
            onDrop={handleDrop}
            className={`
              relative flex flex-col items-center justify-center gap-2
              border-2 border-dashed rounded-xl cursor-pointer
              transition-all duration-200 h-32
              ${
                dragging
                  ? "border-jci-primary-dark bg-blue-50 scale-[1.01]"
                  : "border-slate-400 bg-slate-50 hover:border-jci-primary-dark hover:bg-slate-100"
              }
            `}
          >
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Logo preview"
                  className="h-20 max-w-[200px] object-contain rounded"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview?.(null);
                    setImage?.(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </>
            ) : (
              <>
                <Upload className="w-6 h-6 text-slate-500 hover:text-jci-primary-dark" />
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">
                    Click to upload
                  </span>{" "}
                  or drag & drop
                </p>
                <p className="text-[11px] text-slate-500">
                  PNG, JPG, up to 10MB
                </p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
      );

    default:
      return "Unknown";
  }
}
