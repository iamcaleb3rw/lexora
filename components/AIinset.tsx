import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { getResumeImprovements } from "@/app/actions/get-resume-recommendations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const AIinset = async ({ resumeText }: { resumeText: string }) => {
  const aiSuggestions = await getResumeImprovements(resumeText);
  const numberOfRewriteSuggestions = aiSuggestions.rewriteExamples.length;
  const numberOfActionableSuggestions =
    aiSuggestions.actionableSuggestions.length;
  const numberOfStrengths = aiSuggestions.strengths.length;
  const numberOfWeaknesses = aiSuggestions.weaknesses.length;
  return (
    <div className="h-full flex flex-col bg-white/70 backdrop-blur-xl border-l border-neutral-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white/60 backdrop-blur-xl p-3">
        <h3 className="font-semibold text-neutral-900">AI Suggestions</h3>
      </div>

      {/* Suggestions */}
      <div
        className="flex-1 overflow-y-auto  space-y-4
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-thumb]:bg-neutral-300/70
        [&::-webkit-scrollbar-track]:bg-neutral-100"
      >
        <Accordion
          type="single"
          collapsible
          defaultValue="rewritesuggestions"
          className="w-full p-0"
        >
          <AccordionItem value="rewritesuggestions" className="">
            <AccordionTrigger className="hover:no-underline rounded-none px-3 py-2 border-b">
              <div className="text-sm flex items-center gap-2 font-medium text-neutral-700 fade-in delay-[0ms]">
                <p>Rewrite suggestions </p>
                <div className="size-4 flex items-center text-white rounded-sm justify-center bg-orange-500">
                  {numberOfRewriteSuggestions}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-1">
              {aiSuggestions.rewriteExamples.map((rewriteSuggestion, i) => (
                <div
                  key={i}
                  className={`
              border border-neutral-200 rounded-xl bg-white/60 shadow-sm 
              backdrop-blur-sm relative fade-in mb-1 
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="actionablesuggestions" className="">
            <AccordionTrigger className="hover:no-underline rounded-none px-3 py-2 border-b">
              <div className="text-sm flex items-center gap-2 font-medium text-neutral-700 fade-in delay-[0ms]">
                <p>Other suggestions</p>
                <div className="size-4 flex items-center text-white rounded-sm justify-center bg-blue-500">
                  {numberOfActionableSuggestions}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-1">
              {aiSuggestions.actionableSuggestions.map(
                (actionableSuggestion, i) => (
                  <div
                    key={i}
                    className={`
              border border-neutral-200 rounded-xl bg-white/60 shadow-sm 
              backdrop-blur-sm relative fade-in mb-1 
              delay-[${(i + 1) * 120}ms]
            `}
                  >
                    {/* BEFORE */}
                    <div className="px-3 py-2">
                      <p className="font-medium text-sm  capitalize">
                        {actionableSuggestion.type}
                      </p>
                      <div>
                        <p className=" font-medium text-muted-foreground">
                          {actionableSuggestion.title}
                        </p>
                        <p className="text-xs text-blue-500">
                          {actionableSuggestion.description}
                        </p>
                        <p className="text-muted-foreground font-medium">
                          Example:
                        </p>
                        <p className="text-violet-500 text-xs">
                          {actionableSuggestion.examples}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                  </div>
                )
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="strengths" className="">
            <AccordionTrigger className="hover:no-underline rounded-none px-3 py-2 border-b">
              <div className="text-sm flex items-center gap-2 font-medium text-neutral-700 fade-in delay-[0ms]">
                <p className="text-green-500">Strengths</p>
                <div className="size-4 flex items-center text-white rounded-sm justify-center bg-green-500">
                  {numberOfStrengths}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-1">
              {aiSuggestions.strengths.map((strength, i) => (
                <div
                  key={i}
                  className={`
              border border-neutral-200 rounded-xl bg-white/60 shadow-sm 
              backdrop-blur-sm relative fade-in mb-1 
              delay-[${(i + 1) * 120}ms]
            `}
                >
                  {/* BEFORE */}
                  <div className="px-3 py-2">
                    <p className="font-medium text-muted-foreground text-sm  capitalize">
                      {strength}
                    </p>
                  </div>

                  {/* Actions */}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="weaknesses" className="">
            <AccordionTrigger className="hover:no-underline rounded-none px-3 py-2 border-b">
              <div className="text-sm flex items-center gap-2 font-medium text-neutral-700 fade-in delay-[0ms]">
                <p className="text-yellow-500">Weaknesses</p>
                <div className="size-4 flex items-center text-white rounded-sm justify-center bg-amber-500">
                  {numberOfWeaknesses}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-1">
              {aiSuggestions.weaknesses.map((weakness, i) => (
                <div
                  key={i}
                  className={`
              border border-neutral-200 rounded-xl bg-white/60 shadow-sm 
              backdrop-blur-sm relative fade-in mb-1 
              delay-[${(i + 1) * 120}ms]
            `}
                >
                  {/* BEFORE */}
                  <div className="px-3 py-2">
                    <p className="font-medium text-muted-foreground text-sm  capitalize">
                      {weakness}
                    </p>
                  </div>

                  {/* Actions */}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
