"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SimpleEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  className?: string;
}

export function SimpleEditor({
  value,
  onChange,
  className,
}: SimpleEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const executeCommand = (command: string, commandValue?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      try {
        document.execCommand(command, false, commandValue);
        onChange?.(editorRef.current.innerHTML);
      } catch (error) {
        console.error("Command execution failed:", error);
      }
    }
  };

  const formatHeading = (level: string) => {
    executeCommand("formatBlock", level);
  };

  const handleList = (type: "ul" | "ol") => {
    if (editorRef.current) {
      editorRef.current.focus();
      try {
        if (type === "ul") {
          document.execCommand("insertUnorderedList", false);
        } else {
          document.execCommand("insertOrderedList", false);
        }
        onChange?.(editorRef.current.innerHTML);
      } catch (error) {
        console.error("List command failed:", error);
      }
    }
  };

  const insertCodeBlock = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      try {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const selectedText = range.toString();

          const codeBlock = document.createElement("pre");
          codeBlock.className = "code-block";
          codeBlock.contentEditable = "true";
          codeBlock.style.whiteSpace = "pre-wrap";

          const codeElement = document.createElement("code");
          codeElement.textContent = selectedText || "// Your code here...\n";
          codeBlock.appendChild(codeElement);

          // Insert the code block
          range.deleteContents();
          range.insertNode(codeBlock);

          const paragraph = document.createElement("p");
          paragraph.innerHTML = "<br>";
          codeBlock.parentNode?.insertBefore(paragraph, codeBlock.nextSibling);

          // Move cursor to the code block
          const codeRange = document.createRange();
          codeRange.selectNodeContents(codeElement);
          codeRange.collapse(false);
          selection.removeAllRanges();
          selection.addRange(codeRange);

          onChange?.(editorRef.current.innerHTML);
        }
      } catch (error) {
        console.error("Code block insertion failed:", error);
      }
    }
  };

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;

        // Check if we're inside a code block
        let codeBlock =
          container.nodeType === Node.TEXT_NODE
            ? container.parentElement
            : (container as Element);

        while (codeBlock && !codeBlock.classList?.contains("code-block")) {
          codeBlock = codeBlock.parentElement;
        }

        if (codeBlock && codeBlock.classList.contains("code-block")) {
          e.preventDefault();
          const textNode = document.createTextNode("\n");
          range.insertNode(textNode);
          range.setStartAfter(textNode);
          range.setEndAfter(textNode);
          selection.removeAllRanges();
          selection.addRange(range);
          onChange?.(editorRef.current?.innerHTML || "");
          return;
        }
      }
    }
  };

  React.useEffect(() => {
    if (editorRef.current && !isInitialized) {
      // Set initial content only once
      if (value) {
        editorRef.current.innerHTML = value;
      } else {
        editorRef.current.innerHTML = "<p>Start writing your article...</p>";
      }
      setIsInitialized(true);
    } else if (editorRef.current && isInitialized && value !== undefined) {
      // Only update if the content is significantly different
      const currentContent = editorRef.current.innerHTML;
      if (currentContent !== value && value !== currentContent) {
        editorRef.current.innerHTML = value;
      }
    }
  }, [value, isInitialized]);

  return (
    <div
      className={cn(
        "border rounded-lg bg-background w-full max-w-4xl",
        className
      )}
    >
      {/* Toolbar */}
      <div className="border-b p-2 overflow-x-auto">
        <div className="flex gap-1 min-w-max items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatHeading("h1")}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatHeading("h2")}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatHeading("h3")}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("bold")}
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("italic")}
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("underline")}
          >
            <Underline className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleList("ul")}
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleList("ol")}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={insertCodeBlock}
            title="Code Block"
          >
            <Code className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("justifyLeft")}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("justifyCenter")}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("justifyRight")}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="min-h-[300px] max-h-[500px] overflow-y-auto">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          className="focus:outline-none h-full min-h-[280px] p-4 prose prose-sm max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-medium [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-1 [&_pre.code-block]:bg-gray-50 [&_pre.code-block]:dark:bg-gray-900 [&_pre.code-block]:border [&_pre.code-block]:border-gray-200 [&_pre.code-block]:dark:border-gray-700 [&_pre.code-block]:p-4 [&_pre.code-block]:rounded-lg [&_pre.code-block]:overflow-x-auto [&_pre.code-block]:my-4 [&_pre.code-block]:shadow-sm [&_pre.code-block_code]:font-mono [&_pre.code-block_code]:text-sm [&_pre.code-block_code]:whitespace-pre-wrap [&_pre.code-block_code]:text-pink-600 [&_pre.code-block_code]:dark:text-lime-400"
          suppressContentEditableWarning={true}
        >
          {/* Placeholder content */}
        </div>
      </div>
    </div>
  );
}
