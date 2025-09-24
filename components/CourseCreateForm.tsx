"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, FormProvider } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Image } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import SelectCategories from "./FetchCategories";
import Spinner from "./spinner";
import { useRouter } from "next/navigation";
// your multi-select component

// Zod schema
const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  thumbnail_url: z.string().min(1, "Thumbnail is required"),
  company_id: z.number().min(1),
  is_published: z.boolean().optional(),
  categories: z.array(z.string()).min(1, "Select at least one category"),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface CourseFormProps {
  companyId: number;
}

export default function CourseForm({ companyId }: CourseFormProps) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const methods = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail_url: "",
      company_id: companyId,
      is_published: false,
      categories: [],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  // Upload thumbnail
  const uploadThumbnail = async (file: File) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const res = await axios.post("/api/uploadthumbnail", data);
      if (res.status !== 200) throw new Error("Upload failed");

      setValue("thumbnail_url", res.data);
      toast.success("Thumbnail uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Error uploading thumbnail");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: CourseFormData) => {
    console.log("Submitting course:", data);
    try {
      const res = await axios.post("/api/createcourse", data);
      if (res.status === 200) {
        toast.success("🎯 Course created successfully!");
        console.log("✅ Response from API:", res.data.id);
        router.push(
          `/company-manage/${companyId}/courses/${res.data.id}/lessons`
        );
      } else {
        console.error("⚠ API responded with non-200:", res);
        toast.error("Failed to create course");
      }
    } catch (e) {
      console.error("💥 Error creating course:", e);
      toast.error("Something went wrong");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-6 w-full max-w-lg ml-20 pt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <div className="flex flex-col">
          <Label htmlFor="title" className="mb-1">
            Title
          </Label>
          <Input id="title" {...register("title")} placeholder="Course Title" />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <Label htmlFor="description" className="mb-1">
            Description
          </Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Course Description"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Thumbnail Upload */}
        <div className="col-span-full">
          <Label>Course Thumbnail</Label>
          {!methods.getValues("thumbnail_url") ? (
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <Image
                  aria-hidden="true"
                  className="mx-auto size-12 text-gray-300"
                />
                <div className="mt-4 flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 hover:text-indigo-500">
                    <span>{uploading ? "Uploading..." : "Upload a file"}</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadThumbnail(file);
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <img
                src={methods.getValues("thumbnail_url")}
                alt="Thumbnail"
                className="mt-2 w-full"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => setValue("thumbnail_url", "")}
              >
                Change Thumbnail
              </Button>
            </div>
          )}
          {errors.thumbnail_url && (
            <p className="text-red-500 text-sm mt-1">
              {errors.thumbnail_url.message}
            </p>
          )}
        </div>

        {/* Categories */}
        <SelectCategories name="categories" />
        {errors.categories && (
          <p className="text-red-500 text-sm mt-1">
            {errors.categories.message}
          </p>
        )}

        {/* Published */}
        <div className="flex items-center space-x-2">
          <Checkbox {...register("is_published")} id="is_published" />
          <Label htmlFor="is_published">Published</Label>
        </div>

        {/* Submit */}
        <Button type="submit" className="mt-4" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {isSubmitting ? "Submitting..." : "Create Course"}
        </Button>
      </form>
    </FormProvider>
  );
}
