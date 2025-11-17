import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { getResumeImprovements } from "@/app/actions/get-resume-recommendations";

const AIinset = async ({ resumeText }: { resumeText: string }) => {
  const aiSuggestions = await getResumeImprovements(resumeText);

  return (
    <div className="h-full flex flex-col bg-white/70 backdrop-blur-xl border-l border-neutral-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white/60 backdrop-blur-xl p-3">
        <h3 className="font-semibold text-neutral-900">AI Suggestions</h3>
      </div>

      {/* Suggestions */}
      <div
        className="flex-1 overflow-y-auto px-3 py-2 space-y-4
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-thumb]:bg-neutral-300/70
        [&::-webkit-scrollbar-track]:bg-neutral-100"
      >
        <p className="text-sm font-medium text-neutral-700 fade-in delay-[0ms]">
          Rewrite suggestions
        </p>

        {aiSuggestions.rewriteExamples.map((rewriteSuggestion, i) => (
          <div
            key={i}
            className={`
              border border-neutral-200 rounded-xl bg-white/60 shadow-sm 
              backdrop-blur-sm relative fade-in 
              delay-[${(i + 1) * 120}ms]
            `}
          >
            {/* Left subtle accent bar */}

            {/* BEFORE */}
            <div className="px-3 py-2 border-b border-neutral-200 flex gap-2 items-stretch">
              <div className="w-1 bg-orange-500 rounded-full" />

              <div className="flex-1">
                <p className="text-[11px] font-medium text-neutral-500">
                  Before
                </p>
                <p className="text-sm text-muted-foreground/80 italic line-through">
                  {rewriteSuggestion.before}
                </p>
              </div>
            </div>

            {/* AFTER */}
            <div className="px-3 py-2 flex gap-2 items-stretch">
              <div className="w-1 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-[11px] font-medium text-neutral-500">
                  After
                </p>
                <p className="text-sm text-neutral-900">
                  {rewriteSuggestion.after}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 px-3 py-2 border-t border-neutral-200">
              <Button
                variant="outline"
                className="
                  h-7 px-3 text-xs 
                  border-neutral-300 
                  hover:bg-green-50 hover:border-green-300 hover:text-green-700
                  transition-colors
                "
              >
                Approve
              </Button>
              <Button
                variant="outline"
                className="
                  h-7 px-3 text-xs
                  border-neutral-300
                  hover:bg-red-50 hover:border-red-300 hover:text-red-700
                  transition-colors
                "
              >
                Reject
              </Button>
            </div>
          </div>
        ))}

        {/* Metrics */}
        <div className="p-3 bg-white/60 rounded-xl border border-neutral-200 shadow-sm fade-in delay-[500ms] relative">
          <h4 className="font-medium text-neutral-900 text-xs uppercase mb-1">
            Metrics
          </h4>
          <p className="text-sm text-neutral-700">
            Add quantifiable results to your experience bullet points.
          </p>
        </div>

        {/* Skills */}
        <div className="p-3 bg-white/60 rounded-xl border border-neutral-200 shadow-sm fade-in delay-[650ms] relative">
          {/* Subtle amber bar */}

          <h4 className="font-medium text-neutral-900 text-xs uppercase mb-1">
            Skills
          </h4>
          <p className="text-sm text-neutral-700">
            Consider grouping related skills together for better organization.
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="bg-neutral-50/60 border-t border-neutral-200 p-2 flex-shrink-0 backdrop-blur-xl">
        <Textarea
          rows={6}
          placeholder="Type your prompt..."
          className="w-full border-none shadow-none bg-white/80 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
};

export default AIinset;
