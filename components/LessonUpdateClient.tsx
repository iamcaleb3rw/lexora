"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import {
  lessonSchema,
  type Difficulty,
  type LessonFormData,
  type LessonType,
} from "@/zSchemas/lessonValidation";
import type { GetLessonByIdResponse } from "@/app/company-manage/[companyId]/courses/[courseId]/lessons/[lessonId]/update/page";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LessonUpdateClientProps {
  lesson: GetLessonByIdResponse;
  courseId: string;
  companyId: string;
}

const difficulties: { value: Difficulty; label: string }[] = [
  { value: "novice", label: "Novice" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

const lessonTypes: { value: LessonType; label: string }[] = [
  { value: "text", label: "Text Lesson" },
  { value: "project", label: "Project" },
  { value: "video", label: "Video Lesson" },
];

export default function LessonUpdateClient({
  lesson,
  courseId,
  companyId,
}: LessonUpdateClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      type: lesson.lesson?.type as LessonType,
      title: lesson.lesson?.title,
      xp: lesson.lesson?.xp,
      difficulty_level: lesson.lesson?.difficulty_level as Difficulty,
      content: lesson.lesson?.content || "",
      video_url: lesson.lesson?.video_url || "",
      deliverables: lesson.lesson?.deliverables || "",
      evaluation_criteria: lesson.lesson?.evaluation_criteria || "",
      submission_url: lesson.lesson?.submission_url || "",
    },
  });

  const watchLessonType = form.watch("type");

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "type") {
        if (value.type === "text") {
          form.setValue("video_url", "");
          form.setValue("deliverables", "");
          form.setValue("evaluation_criteria", "");
          form.setValue("submission_url", "");
        } else if (value.type === "video") {
          form.setValue("content", "");
          form.setValue("deliverables", "");
          form.setValue("evaluation_criteria", "");
          form.setValue("submission_url", "");
        } else if (value.type === "project") {
          form.setValue("content", "");
          form.setValue("video_url", "");
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleSubmit = async (data: LessonFormData) => {
    setIsSubmitting(true);
    try {
      const submitData: Record<string, unknown> = {
        lessonId: lesson.lesson?.id,
        type: data.type,
        title: data.title,
        xp: data.xp,
        difficulty_level: data.difficulty_level,
      };

      if (data.type === "text" && data.content) {
        submitData.content = data.content;
      } else if (data.type === "video" && data.video_url) {
        submitData.video_url = data.video_url;
      } else if (data.type === "project") {
        if (data.deliverables) submitData.deliverables = data.deliverables;
        if (data.evaluation_criteria)
          submitData.evaluation_criteria = data.evaluation_criteria;
        if (data.submission_url)
          submitData.submission_url = data.submission_url;
      }

      const response = await axios.patch("/api/updatelesson", submitData);

      if (response.status === 200) {
        toast.success("Lesson updated successfully!");
        router.push(
          `/company-manage/${companyId}/courses/${courseId}/lessons/${lesson.lesson?.id}`
        );
      } else {
        toast.error("Something went wrong while updating the lesson.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      const message =
        error.response?.data ||
        error.message ||
        "An unexpected error occurred while updating.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 rounded-2xl border bg-muted">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Update Lesson
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Modify your lesson details below. Fields change based on the lesson
          type.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Lesson Type */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Lesson Type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 bg-background shadow-none w-full">
                        <SelectValue placeholder="Select lesson type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lessonTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The type determines available fields — switching will clear
                    unrelated ones.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* General Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter lesson title"
                      {...field}
                      className="h-11 bg-background shadow-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="xp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">XP</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter XP value"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 0)
                      }
                      className="h-11 bg-background shadow-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Difficulty */}
          <FormField
            control={form.control}
            name="difficulty_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Difficulty Level
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 w-full bg-background shadow-none">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem
                        key={difficulty.value}
                        value={difficulty.value}
                      >
                        {difficulty.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dynamic Fields */}
          {watchLessonType === "text" && (
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base max-w-4xl font-semibold">
                    Content
                  </FormLabel>
                  <FormControl>
                    <SimpleEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      className="w-full min-h-[250px]"
                    />
                  </FormControl>
                  <FormDescription>
                    Use the editor to format lesson content with text and media.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {watchLessonType === "video" && (
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Video URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com/video"
                      {...field}
                      className="h-11 shadow-none bg-white"
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a valid YouTube, Vimeo, or hosted video link.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {watchLessonType === "project" && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="deliverables"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deliverables</FormLabel>
                    <FormControl>
                      <SimpleEditor
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      What should students submit or deliver for this project?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="evaluation_criteria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Evaluation Criteria</FormLabel>
                    <FormControl>
                      <SimpleEditor
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      How will you evaluate student submissions?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="submission_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Submission URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/submit"
                        {...field}
                        className="h-11 bg-background shadow-none"
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a link for submission (GitHub, Google Form, etc.)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="h-10 px-6"
            >
              Reset
            </Button>
            <Button type="submit" disabled={isSubmitting} className="h-10 px-6">
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Lesson
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
