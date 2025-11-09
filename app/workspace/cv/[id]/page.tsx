import { getResume } from "@/app/actions/get-resume";
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
  const resumeHTML = await convertPDF(resume.file_url);
  console.log(resumeHTML);
  return <ResumeWorkspace resumeHTML={resumeHTML} />;
};

export default Page;
