"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Editor from "./LexicalEditor";

export default function ResumeWorkspace() {
  const [aiOpen, setAiOpen] = useState(true);

  return (
    <div className="flex h-[calc(100vh-52px)] overflow-hidden border-t relative">
      {/* Left Panel - Resume Editor */}
      <div className="flex-1 overflow-y-auto bg-white">
        <Editor />
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
