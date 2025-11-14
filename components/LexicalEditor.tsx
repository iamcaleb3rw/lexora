"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Button } from "./ui/button";

interface EditorProps {
  initialHTML: string;
  aiOpen: boolean;
  setAiOpen: (open: boolean) => void;
}

export default function Editor({
  initialHTML,
  aiOpen,
  setAiOpen,
}: EditorProps) {
  return (
    <div className="flex flex-1 min-h-0">
      {/* Editor Panel - Takes remaining space */}
      <div
        className={`flex-1 min-h-0 ${aiOpen ? "mr-[280px]" : ""} transition-all duration-300`}
      >
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
        className={`fixed right-0 top-16 bottom-0 bg-gray-50 border-l transition-transform duration-300 ${
          aiOpen ? "translate-x-0" : "translate-x-full"
        } print:hidden`}
        style={{ width: "280px" }}
      >
        <div className="h-full flex flex-col">
          {/* AI Panel Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <h3 className="font-semibold text-gray-800">AI Suggestions</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setAiOpen(false)}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* AI Panel Content with thin scrollbar */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <p className="mb-3">
                  Your AI suggestions and resume feedback will appear here.
                </p>

                {/* Sample suggestions - replace with actual AI content */}
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-800 text-xs uppercase mb-1">
                      Action Verbs
                    </h4>
                    <p className="text-sm text-blue-700">
                      Consider using stronger action verbs like "orchestrated"
                      or "spearheaded"
                    </p>
                  </div>

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
                      Consider grouping related skills together for better
                      organization
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button - Only show when AI panel is closed */}
      {!aiOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setAiOpen(true)}
          className="fixed hover:bg-white shadow top-20 right-4 print:hidden"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </Button>
      )}

      {/* Custom CSS to fix SunEditor scrolling */}
    </div>
  );
}
