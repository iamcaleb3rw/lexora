"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Button } from "./ui/button";
import AIinset from "./AIinset";
import { ResumeImprovements } from "@/app/actions/get-resume-recommendations";

interface EditorProps {
  initialHTML: string;
  children: React.ReactNode;
  resumeText: string;
}

export default function Editor({
  initialHTML,
  children,
  resumeText,
}: EditorProps) {
  return (
    <div className="flex flex-1 min-h-0">
      {/* Editor Panel - Takes remaining space */}
      <div className={`flex-1 min-h-0 mr-[280px]  transition-all duration-300`}>
        {/* SunEditor Container with fixed toolbar and scrollable content */}
        <div className="h-full flex flex-col">
          <div className="flex-1 min-h-0 relative">
            <SunEditor
              setDefaultStyle="font-family: 'SF Pro'; border: none;"
              defaultValue={initialHTML}
              setOptions={{
                // Remove height: 100% to prevent toolbar issues
                height: "auto",
                minHeight: "100%",
                buttonList: buttonList.complex,
                font: ["Verdana", "Arial", "Trebuchet MS", "SF Pro"],
              }}
            />
          </div>
        </div>
      </div>

      {/* Fixed AI Panel */}
      <div
        className={`fixed right-0 top-0   bottom-0  border-l transition-transform duration-300  print:hidden`}
        style={{ width: "280px" }}
      >
        {children}
      </div>
    </div>
  );
}
