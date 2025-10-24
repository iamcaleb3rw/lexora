"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDistance } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronsLeft, ChevronsRight, Search, Filter } from "lucide-react";
import { CoursesInfo } from "@/app/actions/get-courses-metadata";
interface CoursesClientProps {
  courses: CoursesInfo;
}
const CoursesClient = ({ courses }: CoursesClientProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [difficulty, setDifficulty] = useState("");

  const handleToggle = (newState: boolean) => {
    console.log("[v0] Sidebar collapsed state changing to:", newState);
    setCollapsed(newState);
  };

  const categories = [
    { label: "All", value: "all" },
    { label: "Programming", value: "programming" },
    { label: "Design", value: "design" },
    { label: "Marketing", value: "marketing" },
    { label: "Business", value: "business" },
  ];

  const sortOptions = [
    { label: "A–Z", value: "az" },
    { label: "Z–A", value: "za" },
    { label: "Newest First", value: "newest" },
    { label: "Most Popular", value: "popularity" },
  ];

  return (
    <div className="flex h-[calc(100vh-3rem)]">
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? "0px" : "260px",
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
          className={`flex flex-col p-4 ${collapsed ? "pointer-events-none" : ""}`}
        >
          <Button
            variant="outline"
            className="w-full text-base text-muted-foreground flex items-center justify-between font-medium rounded-md bg-transparent"
            onClick={() => handleToggle(true)}
          >
            Hide Filters
            <ChevronsLeft className="size-4" />
          </Button>

          <Separator className="mb-4" />

          {/* Category Filter */}
          <div className="space-y-2 mb-6">
            <Label className="text-sm font-semibold text-gray-600">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty Filter */}
          <div className="space-y-2 mb-6">
            <Label className="text-sm font-semibold text-gray-600">
              Difficulty
            </Label>
            <RadioGroup
              value={difficulty}
              onValueChange={setDifficulty}
              className="space-y-1"
            >
              {["Novice", "Intermediate", "Advanced"].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <RadioGroupItem value={level.toLowerCase()} id={level} />
                  <Label htmlFor={level}>{level}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
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

          {/* Search bar */}
          <div className="relative flex-1">
            <Input
              id="search"
              className="peer ps-10 placeholder:text-base shadow-none border-2 placeholder:font-medium text-base font-medium"
              placeholder="What do you want to learn?"
              type="search"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <Search className="size-4" strokeWidth={3} />
            </div>
          </div>

          {/* Sort Filter */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] ml-2">
              <Filter className="size-4 mr-1" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Scrollable Course List */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex">
                <img
                  src={course.thumbnail_url || ""}
                  alt="Course thumbnail"
                  className="max-w-[250px] border w-full"
                />
                <div className="flex-1 border p-2">
                  <p className="uppercase text-xs text-muted-foreground font-medium">
                    By <span>{course.company.name}</span>
                  </p>
                  <p className="font-medium">{course.title}</p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {formatDistance(new Date(course.created_at!), new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                  <p className="line-clamp-2 text-sm mt-2 text-muted-foreground/80">
                    {course.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursesClient;
