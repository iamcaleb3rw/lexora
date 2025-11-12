"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface ResumeWorkspaceProps {
  resumeText: any;
}

export default function ResumeWorkspace({ resumeText }: ResumeWorkspaceProps) {
  const [aiOpen, setAiOpen] = useState(true);

  return (
    <div className="flex h-[calc(100vh-52px)] overflow-hidden border-t relative">
      {/* Left Panel - Resume Editor */}
      <div className="flex-1 overflow-y-auto bg-white p-4">
        <div className="min-h-[800px] border rounded-xl p-4 bg-gray-50">
          ResumeTExt: {resumeText}
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
