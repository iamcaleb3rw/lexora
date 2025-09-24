"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import { Image } from "lucide-react";
import { createCompany } from "../actions/create-company";
import { authClient } from "@/lib/auth-client";

// ------------------ Zod Schema ------------------
const companySchema = z.object({
  companyname: z.string().min(2, "Company name is required"),
  about: z.string().min(10, "Please provide more details"),
  email: z.string().email("Invalid email address"),
  file: z
    .any()
    .refine(
      (file) => !file || file?.[0]?.size <= 10_000_000,
      "Max file size is 10MB"
    )
    .optional(),
  agreement: z.enum(["agree"]).refine((val) => val === "agree", {
    message: "You must accept the agreement",
  }),
});

type CompanyForm = z.infer<typeof companySchema>;

// ------------------ Component ------------------
export default function Example() {
  // ------------------ Hooks ------------------
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyForm>({
    resolver: zodResolver(companySchema),
  });

  // ------------------ Effects ------------------
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && !isPending && !session) {
      router.push("/login");
    }
  }, [mounted, isPending, session, router]);

  if (!mounted || !session) return null; // Prevent SSR errors

  const userId: string = session.user.id;

  // ------------------ File Upload ------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target?.files?.[0];
    setFile(selected);
    if (selected) uploadFile(selected);
  };

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", file);

      const res = await axios.post("/api/uploadlogo", data);

      if (res.status === 200) {
        toast.success("Logo was saved successfully");
        setUrl(res.data);
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Trouble uploading file");
    } finally {
      setUploading(false);
    }
  };

  // ------------------ Form Submission ------------------
  const onSubmit = async (data: CompanyForm) => {
    try {
      const result = await createCompany(
        data.companyname,
        data.about,
        url,
        data.email,
        userId
      );

      if (result) {
        toast.success("Company registered successfully!");
        router.push(`/company-manage/${result[0].insertedId}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while registering the company");
    }
  };

  // ------------------ Render ------------------
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative py-20 max-w-[640px] mx-auto"
    >
      <div className="text-lg font-black w-full border-b sticky top-0 py-4 mb-4 bg-background">
        Company registration
      </div>

      <div className="space-y-12 px-1">
        {/* Profile Section */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Company Name */}
            <div className="sm:col-span-4">
              <label
                htmlFor="companyname"
                className="block text-sm font-medium text-gray-900"
              >
                Company name
              </label>
              <div className="mt-2">
                <Input
                  id="companyname"
                  placeholder="BK Techouse"
                  {...register("companyname")}
                  className="focus-visible:ring-2 focus-visible:ring-purple-500 ring-2 ring-muted-foreground/20 border-none"
                />
                {errors.companyname && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.companyname.message}
                  </p>
                )}
              </div>
            </div>

            {/* About */}
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <Textarea
                  id="about"
                  rows={3}
                  {...register("about")}
                  className="focus-visible:ring-2 focus-visible:ring-purple-500 ring-2 ring-muted-foreground/20 border-none"
                />
                {errors.about && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.about.message}
                  </p>
                )}
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Write a few sentences about your company.
              </p>
            </div>

            {/* File Upload */}
            <div className="col-span-full">
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-900"
              >
                Company logo
              </label>

              {!url && (
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <Image
                      aria-hidden="true"
                      className="mx-auto size-12 text-gray-300"
                    />
                    <div className="mt-4 flex text-sm text-gray-600">
                      <label
                        htmlFor="file"
                        className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        <span>
                          {uploading ? "Uploading..." : "Upload a file"}
                        </span>
                        <input
                          id="file"
                          name="file"
                          type="file"
                          onChange={handleChange}
                          className="sr-only"
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              )}

              {url && (
                <div className="flex flex-col gap-1">
                  <img
                    src={url || "/placeholder.svg"}
                    alt="Company Logo"
                    className="mt-2 w-14"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setUrl("");
                      setFile(undefined);
                    }}
                  >
                    Change Logo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-gray-900">
            Contact information
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Use an email address we should associate to your company
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="bktechouse@bk.rw"
                  {...register("email")}
                  className="focus-visible:ring-2 focus-visible:ring-purple-500 ring-2 ring-muted-foreground/20 border-none"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Agreement Section */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-gray-900">
            Privacy policy
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Make sure to read the privacy policy, terms and conditions
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-x-3">
              <input
                id="agree"
                type="radio"
                value="agree"
                {...register("agreement")}
                className="size-4"
              />
              <label
                htmlFor="agree"
                className="text-sm font-medium text-gray-900"
              >
                I agree and wish to proceed with the creation of this business
                profile
              </label>
            </div>

            <div className="flex items-center gap-x-3">
              <input
                id="disagree"
                type="radio"
                value="disagree"
                {...register("agreement")}
                className="size-4"
              />
              <label
                htmlFor="disagree"
                className="text-sm font-medium text-gray-900"
              >
                I disagree and wish to cancel the creation of this business
                profile
              </label>
            </div>

            {errors.agreement && (
              <p className="text-sm text-red-500 mt-1">
                {errors.agreement.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button type="button" variant="ghost">
          Cancel
        </Button>
        <Button className="bg-purple-500" type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          Register company
        </Button>
      </div>
    </form>
  );
}
