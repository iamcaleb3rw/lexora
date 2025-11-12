"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { StructuredResume } from "@/app/actions/get-structured-resume";

interface ResumeWorkspaceProps {
  finalResume: StructuredResume;
  jobposition: string;
}

export default function ResumeWorkspace({
  finalResume,
  jobposition,
}: ResumeWorkspaceProps) {
  const [aiOpen, setAiOpen] = useState(true);
  const [resume, setResume] = useState({
    fullName: finalResume.fullName || "",
    emailAddress: finalResume.emailAddress || "",
    phoneNumber: finalResume.phoneNumber || "",
    portfolioUrl: finalResume.portfolioUrl || "",
    linkedinUsername: finalResume.linkedinUsername || "",
    experience: finalResume.experience || [],
    education: finalResume.education || [],
    skills: finalResume.skills || [],
  });

  const updateField = (
    section: string,
    index: number | null,
    field: string | null,
    value: string
  ) => {
    setResume((prev) => {
      if (section === "main") {
        return { ...prev, [field!]: value };
      }

      const newSection = [...prev[section]];
      if (field === null) {
        // For skills array
        newSection[index!] = value;
      } else {
        newSection[index!] = { ...newSection[index!], [field]: value };
      }

      return { ...prev, [section]: newSection };
    });
  };

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          title: "New Position",
          company: "Company Name",
          startDate: "YYYY-MM",
          endDate: "",
          description: "Describe your responsibilities and achievements",
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, "New Skill"],
    }));
  };

  const removeSkill = (index: number) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "Degree Name",
          institution: "Institution Name",
          startDate: "YYYY-MM",
          endDate: "YYYY-MM",
          description: "Additional information",
        },
      ],
    }));
  };

  const removeEducation = (index: number) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="flex h-[calc(100vh-52px)] overflow-hidden border-t relative">
      {/* Left Panel - Resume Editor */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="min-h-[800px] border rounded-xl  bg-gray-50">
          {/* PDF Export Button */}
          <div className="p-2 border-b flex">
            <Button variant={"outline"}>Save</Button>
            <div className="print:hidden ">
              <Button
                onClick={handleExportPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Export as PDF
              </Button>
            </div>
          </div>

          <div className="w-full mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6 print:shadow-none print:rounded-none">
            <header className="border-b pb-4">
              <input
                type="text"
                value={resume.fullName}
                onChange={(e) =>
                  updateField("main", null, "fullName", e.target.value)
                }
                className="text-3xl font-bold w-full outline-none border-none focus:ring-0 print:border-b print:border-gray-300"
                placeholder="Full Name"
              />
              <input
                type="text"
                value={jobposition}
                className="text-lg text-gray-500 w-full outline-none border-none focus:ring-0 print:border-b print:border-gray-300"
                placeholder="Job Position"
              />
              <div className="text-sm text-gray-600 mt-2 flex flex-wrap gap-x-3 gap-y-1">
                <input
                  type="text"
                  value={resume.emailAddress}
                  onChange={(e) =>
                    updateField("main", null, "emailAddress", e.target.value)
                  }
                  className="outline-none border-b focus:border-black print:border-gray-300 flex-1 min-w-[120px]"
                  placeholder="Email Address"
                />
                <input
                  type="text"
                  value={resume.phoneNumber}
                  onChange={(e) =>
                    updateField("main", null, "phoneNumber", e.target.value)
                  }
                  className="outline-none border-b focus:border-black print:border-gray-300 flex-1 min-w-[120px]"
                  placeholder="Phone Number"
                />
                <input
                  type="text"
                  value={resume.portfolioUrl}
                  onChange={(e) =>
                    updateField("main", null, "portfolioUrl", e.target.value)
                  }
                  className="outline-none border-b focus:border-black print:border-gray-300 flex-1 min-w-[120px]"
                  placeholder="Portfolio URL"
                />
                <input
                  type="text"
                  value={resume.linkedinUsername}
                  onChange={(e) =>
                    updateField(
                      "main",
                      null,
                      "linkedinUsername",
                      e.target.value
                    )
                  }
                  className="outline-none border-b focus:border-black print:border-gray-300 flex-1 min-w-[120px]"
                  placeholder="LinkedIn Username"
                />
              </div>
            </header>

            {/* Experience Section */}
            <section>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">Experience</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addExperience}
                  className="print:hidden text-xs"
                >
                  + Add Experience
                </Button>
              </div>
              <div className="space-y-4">
                {resume.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-gray-200 pl-4 relative group"
                  >
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) =>
                          updateField(
                            "experience",
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        className="font-medium w-full outline-none border-b focus:border-black print:border-gray-300 mb-1"
                        placeholder="Job Title"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(index)}
                        className="print:hidden opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-800"
                      >
                        Remove
                      </Button>
                    </div>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        updateField(
                          "experience",
                          index,
                          "company",
                          e.target.value
                        )
                      }
                      className="text-gray-600 w-full outline-none border-b focus:border-black print:border-gray-300 text-sm mb-1"
                      placeholder="Company Name"
                    />
                    <div className="text-sm text-gray-500 mb-2 flex gap-2">
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) =>
                          updateField(
                            "experience",
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="outline-none border-b focus:border-black print:border-gray-300 w-20"
                        placeholder="Start"
                      />
                      <span> - </span>
                      <input
                        type="text"
                        value={exp.endDate || "Present"}
                        onChange={(e) =>
                          updateField(
                            "experience",
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="outline-none border-b focus:border-black print:border-gray-300 w-20"
                        placeholder="End"
                      />
                    </div>
                    <textarea
                      value={exp.description}
                      onChange={(e) =>
                        updateField(
                          "experience",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full text-xs bg-gray-50 p-2 rounded-lg outline-none border focus:ring-1 focus:ring-black print:border-gray-300 print:bg-white resize-y min-h-[60px]"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Section */}
            <section>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">Skills</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addSkill}
                  className="print:hidden text-xs"
                >
                  + Add Skill
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <div key={index} className="relative group">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) =>
                        updateField("skills", index, null, e.target.value)
                      }
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm outline-none border focus:ring-1 focus:ring-black print:border-gray-300"
                    />
                    <button
                      onClick={() => removeSkill(index)}
                      className="print:hidden absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">Education</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addEducation}
                  className="print:hidden text-xs"
                >
                  + Add Education
                </Button>
              </div>
              <div className="space-y-4">
                {resume.education.map((edu, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-gray-200 pl-4 relative group"
                  >
                    <div className="flex justify-between items-start">
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          updateField(
                            "education",
                            index,
                            "degree",
                            e.target.value
                          )
                        }
                        className="font-medium w-full outline-none border-b focus:border-black print:border-gray-300 mb-1"
                        placeholder="Degree"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(index)}
                        className="print:hidden opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-800"
                      >
                        Remove
                      </Button>
                    </div>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        updateField(
                          "education",
                          index,
                          "institution",
                          e.target.value
                        )
                      }
                      className="text-gray-600 w-full outline-none border-b focus:border-black print:border-gray-300 text-sm mb-1"
                      placeholder="Institution"
                    />
                    <div className="text-sm text-gray-500 mb-2 flex gap-2">
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) =>
                          updateField(
                            "education",
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="outline-none border-b focus:border-black print:border-gray-300 w-20"
                        placeholder="Start"
                      />
                      <span> - </span>
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) =>
                          updateField(
                            "education",
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="outline-none border-b focus:border-black print:border-gray-300 w-20"
                        placeholder="End"
                      />
                    </div>
                    <textarea
                      value={edu.description}
                      onChange={(e) =>
                        updateField(
                          "education",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full text-xs bg-gray-50 p-2 rounded-lg outline-none border focus:ring-1 focus:ring-black print:border-gray-300 print:bg-white resize-y min-h-[40px]"
                      placeholder="Additional information..."
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Collapse Trigger */}
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => setAiOpen(!aiOpen)}
        className="flex absolute hover:bg-white hover:opacity-100 shadow top-4 right-4 print:hidden"
      >
        {aiOpen ? (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        )}
      </Button>

      {/* Right Panel - AI Suggestions */}
      <div
        className={`transition-all duration-300 border-l bg-gray-100 flex flex-col ${
          aiOpen ? "w-[280px]" : "w-0"
        } overflow-y-auto print:hidden`}
      >
        {aiOpen && (
          <div className="flex-1 p-4">
            <h3 className="font-semibold mb-4">AI Suggestions</h3>
            <p className="text-gray-500 text-sm">
              Your AI suggestions and resume feedback will appear here.
            </p>
            {/* Add your AI suggestion components here */}
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:border-gray-300 {
            border-color: #d1d5db !important;
          }
          .print\\:bg-white {
            background: white !important;
          }
          .resume-container {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
