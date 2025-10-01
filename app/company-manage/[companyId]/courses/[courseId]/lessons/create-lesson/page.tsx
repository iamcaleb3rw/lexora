"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Novice from "@/public/novice.svg";
import Intermediate from "@/public/intermediate.svg";
import Expert from "@/public/expert.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

// ----------------------
// Zod schema for dynamic lesson types
// ----------------------
const lessonSchema = z.discriminatedUnion("lessonType", [
  z.object({
    lessonType: z.literal("video"),
    title: z.string().min(1, "Title is required"),
    videoUrl: z.string().url("Must be a valid video URL"),
  }),
  z.object({
    lessonType: z.literal("project"),
    title: z.string().min(1, "Title is required"),
    deliverables: z.string().min(1, "Please provide deliverables/instructions"),
    submission_url: z.string().optional(),
    difficulty_level: z.string(),
  }),
  z.object({
    lessonType: z.literal("text"),
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
  }),
]);

type LessonFormValues = z.infer<typeof lessonSchema>;

// ----------------------
// Main Lesson Form Component
// ----------------------
export default function LessonForm() {
  const router = useRouter();
  const params = useParams<{ courseId: string; companyId: string }>();
  const courseId = params?.courseId;
  const companyId = params?.companyId;
  const [lessonType, setLessonType] =
    React.useState<LessonFormValues["lessonType"]>("video");

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      lessonType: "video",
      title: "",
    } as LessonFormValues,
  });

  const onSubmit = async (data: LessonFormValues) => {
    try {
      const payload = { ...data, courseId };
      console.log("payload sent", payload);
      const response = await axios.post("/api/createlesson", payload);
      if (response.status === 201) {
        toast.success("Lesson created");
        router.push(`/company-manage/${companyId}/courses/${courseId}/lessons`);
      } else {
        toast.error("Error creating lesson, Please try again.");
      }
    } catch (e) {
      toast.error(JSON.stringify(e));
    }
  };

  return (
    <div className="max-w-xl mt-14 mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Lesson</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Lesson Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter lesson title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Lesson Type */}
          <FormField
            control={form.control}
            name="lessonType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Type</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setLessonType(value as LessonFormValues["lessonType"]);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="text">Article</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Conditional Fields */}
          {lessonType === "video" && (
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter video URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {lessonType === "project" && (
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="deliverables"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Deliverables</FormLabel>
                    <FormControl>
                      <div className="flex justify-center w-full">
                        <Controller
                          name="deliverables"
                          control={form.control}
                          render={({ field: controllerField }) => (
                            <SimpleEditor
                              value={controllerField.value || ""}
                              onChange={controllerField.onChange}
                            />
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="submission_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Submission URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Describe deliverables or instructions"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficulty_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="novice">
                          <Image src={Novice} alt="Intermediate Badge" />
                          Novice
                        </SelectItem>
                        <SelectItem value="intermediate">
                          <Image src={Intermediate} alt="Intermediate Badge" />
                          Intermediate
                        </SelectItem>
                        <SelectItem value="expert">
                          <Image src={Expert} alt="Intermediate Badge" />
                          Expert
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {lessonType === "text" && (
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Content</FormLabel>
                  <FormControl>
                    <div className="flex justify-center w-full">
                      <Controller
                        name="content"
                        control={form.control}
                        render={({ field: controllerField }) => (
                          <SimpleEditor
                            value={controllerField.value || ""}
                            onChange={controllerField.onChange}
                          />
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full">
            Create Lesson
          </Button>
        </form>
      </Form>
    </div>
  );
}
