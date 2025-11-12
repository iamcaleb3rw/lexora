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

  return (
    <div className="flex h-[calc(100vh-52px)] overflow-hidden border-t relative">
      {/* Left Panel - Resume Editor */}
      <div className="flex-1 overflow-y-auto bg-white p-4">
        <div className="min-h-[800px] border rounded-xl p-4 bg-gray-50">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
            <header className="border-b pb-4">
              <input
                type="text"
                value={finalResume.fullName}
                className="text-3xl font-bold w-full outline-none border-none focus:ring-0"
              />
              <input
                type="text"
                value={jobposition}
                className="text-lg text-gray-500 w-full outline-none border-none focus:ring-0"
              />
              <div className="text-sm text-gray-600 mt-2 flex flex-wrap gap-x-3">
                <input
                  type="text"
                  value={finalResume.emailAddress}
                  className="outline-none border-b focus:border-black"
                />
                <input
                  type="text"
                  value={finalResume.phoneNumber}
                  className="outline-none border-b focus:border-black"
                />
                <input
                  type="text"
                  value="Kigali, Rwanda"
                  className="outline-none border-b focus:border-black"
                />
              </div>
            </header>

            <section>
              <h2 className="font-semibold text-lg mb-2">Experience</h2>
              <div className="space-y-4">
                <div>
                  {finalResume.experience.map((e) => (
                    <div>
                      <input
                        type="text"
                        value={`${e.title} - ${e.company}`}
                        className="font-medium w-full outline-none border-b focus:border-black"
                      />
                      <div className="text-sm text-gray-500 mb-2">
                        <input
                          type="text"
                          value={`${e.startDate} - ${!e.endDate ? "Present" : e.endDate}`}
                          className="outline-none border-b focus:border-black"
                        />
                      </div>
                      <textarea className="w-full text-xs bg-gray-50 p-2 rounded-lg outline-none border focus:ring-1 focus:ring-black">
                        {e.description}
                      </textarea>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value="JavaScript"
                  className="bg-gray-100 px-3 py-1 rounded-full focus:ring-1 focus:ring-black"
                />
                <input
                  type="text"
                  value="React"
                  className="bg-gray-100 px-3 py-1 rounded-full focus:ring-1 focus:ring-black"
                />
                <input
                  type="text"
                  value="Next.js"
                  className="bg-gray-100 px-3 py-1 rounded-full focus:ring-1 focus:ring-black"
                />
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-2">Education</h2>
              <div>
                <input
                  type="text"
                  value="BSc Computer Science, University of Rwanda"
                  className="font-medium w-full outline-none border-b focus:border-black"
                />
                <div className="text-sm text-gray-500">
                  <input
                    type="text"
                    value="2018 - 2022"
                    className="outline-none border-b focus:border-black"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Collapse Trigger */}
      {/* <Button
        variant={"outline"}
        size={"icon-sm"}
        onClick={() => setAiOpen(!aiOpen)}
        className="flex absolute hover:bg-white hover:opacity-100 shadow top-0 right-0 "
      >
        {aiOpen ? (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        )}
      </Button> */}

      {/* Right Panel - AI Suggestions */}
      <div
        className={`transition-all duration-300 border-l bg-gray-100 flex flex-col ${
          aiOpen ? "w-[280px]" : "w-0"
        } overflow-y-auto`}
      >
        {aiOpen && (
          <div className="flex-1 p-4">
            <p className="text-gray-500 text-sm">
              Your AI suggestions and resume feedback will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
