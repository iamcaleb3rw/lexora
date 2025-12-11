// store/resumeStore.ts
import { create } from "zustand";
import {
  getResumeImprovements,
  ResumeImprovements,
} from "@/app/actions/get-resume-recommendations";

import { StructuredResume } from "@/types/resume";
import { generateHTML } from "@/utils/generateResume";

interface ResumeState {
  structuredResume: StructuredResume;
  resumeHTML: string;
  resumeTextForAI: string;
  improvements: ResumeImprovements | null;
  isLoadingImprovements: boolean;
  sunEditorInstance: any | null; // To hold the SunEditor instance directly

  // Actions
  setStructuredResume: (resume: StructuredResume) => void;
  setResumeHTML: (html: string) => void;
  updateSunEditorInstance: (instance: any) => void;
  applyRewrite: (
    targetId: string,
    beforeText: string,
    afterText: string
  ) => void;
  fetchImprovements: () => Promise<void>;
  optimisticRemoveWeaknessAndRewrite: (
    targetId: string,
    beforeText: string
  ) => void;
  dismissRewriteExample: (id: string) => void; // New action for dismissing rewrites
}

// Helper function to extract plain text from HTML
const extractTextFromHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// Define some initial structured data
const defaultStructuredResume: StructuredResume = {
  fullName: "John Doe",
  emailAddress: "john.doe@example.com",
  phoneNumber: "123-456-7890",
  linkedinUsername: "johndoe",
  portfolioUrl: "https://johndoe.com",
  experience: [
    {
      title: "Software Engineer",
      company: "Tech Solutions Inc.",
      startDate: "Jan 2022",
      endDate: "Present",
      description:
        "Led a team of 5 developers. Responsible for project delivery. Used various technologies.",
    },
    {
      title: "Junior Developer",
      company: "Startup X",
      startDate: "Jul 2020",
      endDate: "Dec 2021",
      description:
        "Assisted in backend development. Contributed to feature implementation.",
    },
  ],
  education: [
    {
      degree: "M.Sc. Computer Science",
      institution: "University of Tech",
      startDate: "Sep 2019",
      endDate: "May 2021",
      description: "Focused on AI and Machine Learning.",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "AWS",
  ],
};

// Generate initial HTML from the default structured resume
const initialResumeHTML = generateHTML(defaultStructuredResume);

export const useResumeStore = create<ResumeState>()((set, get) => ({
  structuredResume: defaultStructuredResume,
  resumeHTML: initialResumeHTML,
  resumeTextForAI: extractTextFromHtml(initialResumeHTML),
  improvements: null,
  isLoadingImprovements: false,
  sunEditorInstance: null,

  setStructuredResume: (resume: StructuredResume) => {
    const newHTML = generateHTML(resume);
    set({
      structuredResume: resume,
      resumeHTML: newHTML,
      resumeTextForAI: extractTextFromHtml(newHTML),
    });
  },

  setResumeHTML: (html: string) => {
    set({
      resumeHTML: html,
      resumeTextForAI: extractTextFromHtml(html),
    });
  },

  updateSunEditorInstance: (instance: any) => {
    set({ sunEditorInstance: instance });
  },

  applyRewrite: (targetId: string, beforeText: string, afterText: string) => {
    const {
      sunEditorInstance,
      setResumeHTML,
      optimisticRemoveWeaknessAndRewrite,
    } = get();

    if (sunEditorInstance) {
      const currentContent = sunEditorInstance.getContents();

      // IMPORTANT: The `beforeText` must be an exact match for the string in `currentContent`.
      // If the `beforeText` contains complex HTML or needs to be matched more robustly,
      // consider using DOM manipulation (e.g., finding by data-segment-id) instead of simple string.replace.
      // For now, assuming exact string match as provided by AI.
      const newContent = currentContent.replace(beforeText, afterText);

      sunEditorInstance.setContents(newContent);
      setResumeHTML(newContent); // This updates store state and triggers re-fetch
      optimisticRemoveWeaknessAndRewrite(targetId, beforeText);
    }
  },

  optimisticRemoveWeaknessAndRewrite: (
    targetId: string,
    beforeText: string
  ) => {
    set((state) => {
      if (!state.improvements) return state;

      const newWeaknesses = state.improvements.weaknesses.filter(
        (weakness) => weakness.targetId !== targetId
      );

      const newRewriteExamples = state.improvements.rewriteExamples.filter(
        (example) =>
          example.targetId !== targetId || example.before !== beforeText
      );

      return {
        improvements: {
          ...state.improvements,
          weaknesses: newWeaknesses,
          rewriteExamples: newRewriteExamples,
        },
      };
    });
  },

  dismissRewriteExample: (id: string) => {
    set((state) => {
      if (!state.improvements) return state;
      const newRewriteExamples = state.improvements.rewriteExamples.filter(
        (example) => example.id !== id
      );
      return {
        improvements: {
          ...state.improvements,
          rewriteExamples: newRewriteExamples,
        },
      };
    });
  },

  fetchImprovements: async () => {
    const { resumeTextForAI } = get();
    if (!resumeTextForAI.trim()) {
      set({ improvements: null, isLoadingImprovements: false });
      return;
    }

    set({ isLoadingImprovements: true });
    try {
      const result = await getResumeImprovements(resumeTextForAI);
      set({ improvements: result });
    } catch (error) {
      console.error("Failed to fetch resume improvements:", error);
      set({ improvements: null });
    } finally {
      set({ isLoadingImprovements: false });
    }
  },
}));
