"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ImageIcon, X } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { SidebarTrigger } from "@/components/TriggerButton";
import { useRouter } from "next/navigation";

const cvFormSchema = z.object({
  jobTitle: z.string().min(3, "Job title must be at least 3 characters"),
  jobDescription: z.string().optional(),
  resume: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Resume file is required")
    .refine(
      (files) => files?.[0]?.type === "application/pdf",
      "Only PDF files are accepted"
    )
    .refine(
      (files) => files?.[0]?.size <= 10 * 1024 * 1024,
      "File size must be less than 10MB"
    ),
});

type CVFormData = z.infer<typeof cvFormSchema>;

export default function CreateCV() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CVFormData>({
    resolver: zodResolver(cvFormSchema),
  });

  const [fileName, setFileName] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const router = useRouter();

  const handleFileUpload = async (file: File) => {
    setFileName(file.name);
    setUploading(true);
    setUploadError(null);
    setUploadProgress(0);
    setResumeUrl(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/uploadresume", formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          }
        },
      });

      // Closure delay for realism
      await new Promise((r) => setTimeout(r, 600));
      setResumeUrl(response.data);

      // Update RHF value for validation
      const fileList = new DataTransfer();
      fileList.items.add(file);
      setValue("resume", fileList.files);
    } catch (error: any) {
      console.error("Upload failed:", error);
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleRemoveFile = () => {
    setResumeUrl(null);
    setFileName("");
    setUploadProgress(0);
    setValue("resume", new DataTransfer().files);
    // TODO: optionally delete from Pinata
  };

  const onSubmit = async (data: CVFormData) => {
    if (!resumeUrl) {
      return;
    }

    const payload = {
      job_title: data.jobTitle,
      job_description: data.jobDescription ?? "",
      resume_url: resumeUrl,
    };
    const response = await axios.post("/api/createresume", payload);
    console.log("RESPONSE", response);
    if (response.status === 200) {
      router.push("/workspace/cv/ai");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mb-6 mx-auto">
      <SidebarTrigger />

      <div className="space-y-12 mx-auto mt-5 px-3">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Resumé</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Tailor your resumé to any job posting.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Job Title */}
            <div className="sm:col-span-4">
              <Label htmlFor="jobtitle">Job title</Label>
              <Input
                id="jobtitle"
                type="text"
                placeholder="Software Engineer"
                {...register("jobTitle")}
              />
              {errors.jobTitle && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>

            {/* Job Description */}
            <div className="col-span-full">
              <Label htmlFor="jobdescription">Job Description (Optional)</Label>
              <Textarea
                id="jobdescription"
                rows={3}
                placeholder="Paste the job description here..."
                {...register("jobDescription")}
              />
            </div>

            {/* File Upload */}
            <div className="col-span-full">
              <Label htmlFor="resume">Resumé</Label>
              <div
                className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 transition-all ${
                  dragActive
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-900/25 bg-transparent"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="text-center">
                  <ImageIcon
                    className={`mx-auto size-12 transition-colors ${
                      dragActive ? "text-indigo-400" : "text-gray-300"
                    }`}
                  />
                  <div className="mt-4 flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".pdf"
                        className="sr-only"
                        {...register("resume")}
                        onChange={handleFileSelect}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-600">PDF up to 10MB</p>

                  {uploading && (
                    <div className="mt-3">
                      <div className="w-48 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        {uploadProgress < 100
                          ? `Uploading: ${uploadProgress}%`
                          : "Finalizing..."}
                      </p>
                    </div>
                  )}

                  {/* Animated Success Badge */}
                  <AnimatePresence>
                    {resumeUrl && !uploading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 flex items-center justify-between gap-3 p-2 border shadow rounded-md w-full max-w-xs text-sm bg-white"
                      >
                        <div className="flex items-center gap-2">
                          <Check
                            className="size-4 bg-green-500 rounded-md p-[2px]"
                            stroke="#fff"
                          />
                          <span className="truncate">{fileName}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="text-gray-500 hover:text-red-500 transition"
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {errors.resume && (
                    <p className="text-sm text-red-600 mt-2">
                      {errors.resume.message as string}
                    </p>
                  )}

                  {uploadError && (
                    <p className="text-sm text-red-600 mt-2">{uploadError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold text-gray-900">
          Cancel
        </button>
        <Button type="submit" disabled={isSubmitting || uploading}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
