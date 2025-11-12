import { getResume } from "@/app/actions/get-resume";
import { getStructuredResume } from "@/app/actions/get-structured-resume";
import { getResumeText } from "@/app/actions/getResumeText";
import { convertPDF } from "@/app/actions/pdf-to-html";
import ResumeWorkspace from "@/components/ResumeWorkspace";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resumeId = (await params).id;
  const resume = await getResume(resumeId);
  if (!resume) {
    notFound();
  }
  const resumeText = await getResumeText(resume.file_url);
  const finalResume = await getStructuredResume(resumeText);
  console.log("FINALRESUME", finalResume);
  return (
    <ResumeWorkspace finalResume={finalResume} jobposition={resume.job_title} />
  );
};

export default Page;
