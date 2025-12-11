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
import AIInsetClient from "./AIInsetClient";

const AIinset = async ({ resumeText }: { resumeText: string }) => {
  const aiSuggestions = await getResumeImprovements(resumeText);
  console.log(aiSuggestions);
  const numberOfRewriteSuggestions = aiSuggestions.rewriteExamples.length;
  const numberOfActionableSuggestions =
    aiSuggestions.actionableSuggestions.length;
  const numberOfStrengths = aiSuggestions.strengths.length;
  const numberOfWeaknesses = aiSuggestions.weaknesses.length;
  return (
    <AIInsetClient resumeText={resumeText} aiSuggestions={aiSuggestions} />
  );
};

export default AIinset;
