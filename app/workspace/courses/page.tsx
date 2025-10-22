"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronsLeft, ChevronsRight, Search } from "lucide-react";
import { useState } from "react";

const Courses = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = (newState: boolean) => {
    console.log("[v0] Sidebar collapsed state changing to:", newState);
    setCollapsed(newState);
  };

  return (
    <div className="flex h-[calc(100vh-3rem)]">
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? "0px" : "250px",
          borderRightWidth: collapsed ? "0px" : "1px",
          transition: "width 300ms ease-out, border-width 300ms ease-out",
        }}
        className="bg-white border-r border-gray-200 sticky top-[3rem] h-[calc(100vh-3rem)] flex flex-col overflow-hidden"
      >
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

      {/* Main Area (separate flex column container) */}
      <div className="flex-1 flex flex-col">
        {/* Sticky search + show filters */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b px-3 py-2 flex items-center gap-2">
          {collapsed && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleToggle(false)}
              className="text-base text-muted-foreground font-medium"
            >
              Show filters
              <ChevronsRight className="size-4" />
            </Button>
          )}
          <Separator orientation="vertical" />
          <div className="relative flex-1">
            <Input
              id="search"
              className="peer ps-10 placeholder:text-base shadow-none border-2  placeholder:font-medium text-base font-medium"
              placeholder="What do you want to learn?"
              type="search"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <Search className="size-4" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Scrollable content (must be its own overflow container) */}
        <main className="flex-1 overflow-y-auto p-2">
          <div className="space-y-4">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="p-4 bg-gray-50 border rounded">
                Item {i + 1}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Courses;
