import { getResume } from "@/app/actions/get-resume";
import { getResumeImprovements } from "@/app/actions/get-resume-recommendations";
import { getStructuredResume } from "@/app/actions/get-structured-resume";
import { getResumeText } from "@/app/actions/getResumeText";

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

  return <ResumeWorkspace resumeObject={finalResume} resumeText={resumeText} />;
};

export default Page;
