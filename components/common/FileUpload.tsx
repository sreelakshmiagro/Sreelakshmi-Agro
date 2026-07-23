"use client";

import React, { useRef, useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react";

interface FileUploadProps {
  label: string;
  id: string;
  error?: string;
  value?: string;
  onChange: (path: string) => void;
  onUpload: (file: File) => Promise<string>;
  accept?: string;
  maxSizeMB?: number;
}

export default function FileUpload({
  label,
  id,
  error,
  value,
  onChange,
  onUpload,
  accept = "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  maxSizeMB = 5,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [fileName, setFileName] = useState("");
  const [uploadError, setUploadError] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    // 1. Validation checks
    const sizeLimit = maxSizeMB * 1024 * 1024;
    if (file.size > sizeLimit) {
      setUploadError(`File exceeds maximum size of ${maxSizeMB}MB.`);
      setUploadState("error");
      return;
    }

    const acceptedTypes = accept.split(",");
    if (!acceptedTypes.includes(file.type)) {
      setUploadError("Only PDF and Word documents are supported.");
      setUploadState("error");
      return;
    }

    // 2. Upload flow
    setFileName(file.name);
    setUploadState("uploading");
    setUploadError("");

    try {
      const storagePath = await onUpload(file);
      onChange(storagePath);
      setUploadState("success");
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload file. Please try again.");
      setUploadState("error");
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const resetUpload = () => {
    onChange("");
    setFileName("");
    setUploadState("idle");
    setUploadError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <span className="font-sans text-xs font-semibold text-text-secondary uppercase tracking-wider">
        {label}
      </span>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => uploadState !== "uploading" && fileInputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 min-h-[160px] ${
          isDragActive ? "border-brand-primary bg-brand-primary/5" : "border-border-light bg-bg-tertiary"
        } ${uploadState === "uploading" ? "pointer-events-none opacity-80" : ""} ${
          error || uploadState === "error" ? "border-red-500 bg-red-50/10" : ""
        }`}
      >
        <input
          id={id}
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={uploadState === "uploading"}
        />

        {uploadState === "idle" && (
          <>
            <Upload className="w-8 h-8 text-text-tertiary group-hover:text-brand-primary transition-colors" />
            <div className="text-center font-sans">
              <p className="text-sm font-semibold text-text-primary">
                Drag & drop file or <span className="text-brand-primary">browse</span>
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Supports PDF, DOCX (Max {maxSizeMB}MB)
              </p>
            </div>
          </>
        )}

        {uploadState === "uploading" && (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-brand-primary/20 border-t-brand-primary animate-spin" />
            <p className="font-sans text-sm font-semibold text-text-primary">
              Uploading {fileName}...
            </p>
          </div>
        )}

        {uploadState === "success" && (
          <div className="flex items-center justify-between w-full bg-emerald-50/40 border border-emerald-500/20 p-3 rounded-md">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-sans text-sm font-bold text-text-primary truncate max-w-[200px]">
                  {fileName}
                </span>
                <span className="font-sans text-xs text-emerald-600 font-medium">
                  File uploaded successfully
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                resetUpload();
              }}
              className="p-1 text-text-secondary hover:text-red-500 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {uploadState === "error" && (
          <div className="flex items-center justify-between w-full bg-red-50/40 border border-red-500/20 p-3 rounded-md">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-sans text-sm font-bold text-text-primary truncate max-w-[200px]">
                  {fileName || "File Upload"}
                </span>
                <span className="font-sans text-xs text-red-600 font-medium">
                  {uploadError || "Upload failed"}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                resetUpload();
              }}
              className="p-1 text-text-secondary hover:text-brand-primary rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {error && !uploadError && (
        <span role="alert" className="font-sans text-xs text-red-600 font-medium">
          {error}
        </span>
      )}
    </div>
  );
}
