import { StructuredResume } from "@/app/actions/get-structured-resume";
import Editor from "./LexicalEditor";
import { SidebarTrigger } from "./TriggerButton";
import {
  getResumeImprovements,
  ResumeImprovements,
} from "@/app/actions/get-resume-recommendations";
import AIinset from "./AIinset";
import { Suspense } from "react";
import SuggestionsLoading from "./SuggestionsLoading";
import AIinsetSkeleton from "./SuggestionsLoading";

interface ResumeWorkspaceProps {
  resumeObject: StructuredResume;
  resumeText: string;
}

export default async function ResumeWorkspace({
  resumeObject,
  resumeText,
}: ResumeWorkspaceProps) {
  const generateHTML = (resume: StructuredResume) => {
    const {
      fullName,
      emailAddress,
      phoneNumber,
      linkedinUsername,
      portfolioUrl,
      experience,
      education,
      skills,
    } = resume;

    const contactInfo = [
      emailAddress,
      phoneNumber,
      linkedinUsername && `https://linkedin.com/in/${linkedinUsername}`,
      portfolioUrl,
    ]
      .filter(Boolean)
      .join(" | ");

    const expHTML = experience.length
      ? experience
          .map(
            (exp) => `
            <div style="margin-bottom: 1rem; page-break-inside: avoid;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.25rem;">
                <div>
                  <strong style="font-size: 1.1rem;">${exp.title}</strong>
                  ${exp.company ? ` - ${exp.company}` : ""}
                </div>
                <div style="color: #666; font-size: 0.9rem; text-align: right;">
                  ${exp.startDate || ""} ${exp.endDate ? ` - ${exp.endDate}` : exp.startDate ? " - Present" : ""}
                </div>
              </div>
              ${exp.description ? `<div style="margin-top: 0.25rem; line-height: 1.4;">${exp.description.replace(/\n/g, "<br>")}</div>` : ""}
            </div>
          `
          )
          .join("")
      : "<p>No experience listed.</p>";

    const eduHTML = education.length
      ? education
          .map(
            (edu) => `
            <div style="margin-bottom: 1rem; page-break-inside: avoid;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.25rem;">
                <div>
                  <strong style="font-size: 1.1rem;">${edu.degree}</strong>
                  ${edu.institution ? ` - ${edu.institution}` : ""}
                </div>
                <div style="color: #666; font-size: 0.9rem; text-align: right;">
                  ${edu.startDate || ""} ${edu.endDate ? ` - ${edu.endDate}` : edu.startDate ? " - Present" : ""}
                </div>
              </div>
              ${edu.description ? `<div style="margin-top: 0.25rem; line-height: 1.4;">${edu.description.replace(/\n/g, "<br>")}</div>` : ""}
            </div>
          `
          )
          .join("")
      : "<p>No education listed.</p>";

    const skillsHTML = skills.length
      ? `<div style="line-height: 1.8;">${skills
          .map((skill) => `${skill}`)
          .join(" • ")}</div>`
      : "<p>No skills listed.</p>";

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${fullName || "Resume"}</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.4;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      overflow: hidden;
    }
    @media print {
      body { 
        padding: 0;
        overflow: visible;
      }
    }
  </style>
</head>
<body>
  <header style="text-align: center; margin-bottom: 2rem; border-bottom: 2px solid #333; padding-bottom: 1rem;">
    <h1 style="font-size: 2rem; font-weight: bold; margin: 0 0 0.5rem 0; color: #000;">${fullName || "Your Name"}</h1>
    <div style="color: #555; font-size: 1rem;">${contactInfo}</div>
  </header>
  
  <section style="margin-bottom: 1.5rem;">
    <h2 style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.75rem; border-bottom: 1px solid #ddd; padding-bottom: 0.25rem; color: #000;">EXPERIENCE</h2>
    ${expHTML}
  </section>

  <section style="margin-bottom: 1.5rem;">
    <h2 style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.75rem; border-bottom: 1px solid #ddd; padding-bottom: 0.25rem; color: #000;">EDUCATION</h2>
    ${eduHTML}
  </section>

  <section style="margin-bottom: 1.5rem;">
    <h2 style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.75rem; border-bottom: 1px solid #ddd; padding-bottom: 0.25rem; color: #000;">SKILLS</h2>
    ${skillsHTML}
  </section>
</body>
</html>
    `;
  };

  return (
    <div className="flex h-[calc(100vh-64px)] border-t">
      <SidebarTrigger />
      <div className="flex-1 flex min-h-0">
        <Editor
          initialHTML={generateHTML(resumeObject)}
          resumeText={resumeText}
        >
          <Suspense fallback={<AIinsetSkeleton />}>
            <AIinset resumeText={resumeText} />
          </Suspense>
        </Editor>
      </div>
    </div>
  );
}
