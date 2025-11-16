import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { getResumeImprovements } from "@/app/actions/get-resume-recommendations";

const AIinset = async ({ resumeText }: { resumeText: string }) => {
  const aiSuggestions = await getResumeImprovements(resumeText);
  console.log("FROM AI PANEL", aiSuggestions);
  return (
    <div className="h-full flex flex-col ">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-white p-3">
        <h3 className="font-semibold text-gray-800">AI Suggestions</h3>
      </div>

      {/* Scrollable suggestions */}
      <div className="flex-1 overflow-y-auto  [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ">
        <p className="text-sm font-medium">Rewrite suggestions</p>
        {aiSuggestions.rewriteExamples.map((rewriteSuggestion) => (
          <div className="border rounded-md text-xs overflow-hidden ">
            <p className="bg-red-50 text-red-500 p-1">
              ❌ {rewriteSuggestion.before}
            </p>
            <p className="bg-green-100 text-green-500 p-1">
              ✔️ {rewriteSuggestion.after}{" "}
            </p>
          </div>
        ))}
        <div className="p-3 bg-green-50 rounded-lg border border-green-100">
          <h4 className="font-medium text-green-800 text-xs uppercase mb-1">
            Metrics
          </h4>
          <p className="text-sm text-green-700">
            Add quantifiable results to your experience bullet points
          </p>
        </div>
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
          <h4 className="font-medium text-amber-800 text-xs uppercase mb-1">
            Skills
          </h4>
          <p className="text-sm text-amber-700">
            Consider grouping related skills together for better organization
          </p>
        </div>
      </div>

      {/* Fixed bottom input */}
      <div className="bg-muted p-1   flex-shrink-0">
        <Textarea
          rows={6}
          placeholder="Type your prompt..."
          className="w-full border-none shadow-none    focus-within:ring-offset-0 rounded px-3 py-2 focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 ring-offset-0"
        />
      </div>
    </div>
  );
};

export default AIinset;
