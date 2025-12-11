import React from "react";
import { notFound } from "next/navigation";
import ResumeWorkspace from "@/components/ResumeWorkspace";
import { getResume } from "@/app/actions/get-resume";
import { getResumeText } from "@/app/actions/getResumeText";
import { getStructuredResume } from "@/app/actions/get-structured-resume";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resumeId = (await params).id;
  const resume = await getResume(resumeId);
  if (!resume) notFound();

  const resumeText = await getResumeText(resume.file_url);
  const finalResume = await getStructuredResume(resumeText);

  return <ResumeWorkspace resumeObject={finalResume} resumeText={resumeText} />;
};

export default Page;
