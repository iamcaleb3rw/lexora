"use client";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";

const Courses = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = (newState: boolean) => {
    console.log("[v0] Sidebar collapsed state changing to:", newState);
    setCollapsed(newState);
  };

  return (
    <div className="flex min-h-[calc(100vh-3rem)]">
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? "0px" : "250px",
          borderRightWidth: collapsed ? "0px" : "1px",
          transition: "width 300ms ease-out, border-width 300ms ease-out",
        }}
        className="bg-white border-r border-gray-200 sticky top-[3rem] h-[calc(100vh-3rem)] flex flex-col overflow-hidden"
      >
        {/* Content wrapper with opacity transition and padding */}
        <div
          style={{
            opacity: collapsed ? 0 : 1,
            transition: "opacity 300ms ease-out",
          }}
          className={`p-2 ${collapsed ? "pointer-events-none" : ""}`}
        >
          <div className="mb-2">
            <Button
              variant="outline"
              className="text-sm w-full flex items-center justify-between font-medium rounded-md border bg-transparent"
              onClick={() => handleToggle(true)}
            >
              Filters
              <ChevronsLeft className="size-4" />
            </Button>
          </div>
          <hr />
          <div className="mt-2 space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
            >
              Difficulty: Novice
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
            >
              Difficulty: Intermediate
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
            >
              Difficulty: Advanced
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 my-2 overflow-auto p-2">
        {collapsed && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleToggle(false)}
            className="font-medium"
          >
            Show filters
            <ChevronsRight className="size-4" />
          </Button>
        )}
        <p>Main content goes here</p>
        <div className="space-y-4">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="p-4 bg-gray-50 border rounded">
              Item {i + 1}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Courses;
