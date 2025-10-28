"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { SidebarTrigger } from "@/components/TriggerButton";

const cvFormSchema = z.object({
  jobTitle: z
    .string()
    .min(1, "Job title is required")
    .min(3, "Job title must be at least 3 characters"),
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
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CVFormData>({
    resolver: zodResolver(cvFormSchema),
  });

  const [fileName, setFileName] = useState<string>("");
  const resumeFiles = watch("resume");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const onSubmit = async (data: CVFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
    // You can process the file upload and other data
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
            <div className="sm:col-span-4">
              <Label
                htmlFor="jobtitle"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Job title
              </Label>
              <div className="mt-2">
                <Input
                  id="jobtitle"
                  type="text"
                  placeholder="Software Engineer"
                  {...register("jobTitle")}
                  aria-invalid={errors.jobTitle ? "true" : "false"}
                />
              </div>
              {errors.jobTitle && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>

            <div className="col-span-full">
              <Label
                htmlFor="jobdescription"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Job Description (Optional)
              </Label>
              <div className="mt-2">
                <Textarea
                  id="jobdescription"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Paste the job description here..."
                  {...register("jobDescription")}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Copy and paste the job description here. We use the job
                description to match your resumé to the job posting.
              </p>
            </div>

            <div className="col-span-full">
              <Label
                htmlFor="cover-photo"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Resumé
              </Label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <ImageIcon
                    aria-hidden="true"
                    className="mx-auto size-12 text-gray-300"
                  />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".pdf"
                        className="sr-only"
                        {...register("resume")}
                        onChange={(e) => {
                          register("resume").onChange(e);
                          handleFileChange(e);
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PDF up to 10MB</p>
                  {fileName && (
                    <p className="mt-2 text-sm text-gray-900 font-medium">
                      Selected: {fileName}
                    </p>
                  )}
                </div>
              </div>
              {errors.resume && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.resume.message as string}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <Button
          type="submit"
          className="max-w-30 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
