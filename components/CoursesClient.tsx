"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // ShadCN toast
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseAsInteger, useQueryState } from "nuqs";
import { formatDistance } from "date-fns";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronsLeft, ChevronsRight, Search } from "lucide-react";
import type { CoursesInfo } from "@/app/actions/get-courses-metadata";
import { Skeleton } from "./ui/skeleton";

interface Category {
  id: string;
  name: string;
}

interface CoursesClientProps {
  courses: CoursesInfo;
}

const CoursesClient = ({ courses }: CoursesClientProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [perPage, setPerPage] = useQueryState(
    "perPage",
    parseAsInteger.withDefault(10)
  );
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<CoursesInfo | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleToggle = (newState: boolean) => {
    console.log("[Sidebar] Collapsed state changing to:", newState);
    setCollapsed(newState);
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/fetchcategories");
        setCategories(data);
      } catch (error: any) {
        console.error("[Error fetching categories]:", error);
        toast.error("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // If search is empty, show initial courses
    if (!search || search.trim() === "") {
      setSearchResults(null);
      return;
    }

    // Debounce search by 500ms
    const timeoutId = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const response = await axios.get("/api/fulltextsearch", {
          params: { search },
        });
        setSearchResults(response.data);
      } catch (error: any) {
        console.error("[Error searching courses]:", error);
        toast.error("Failed to search courses. Please try again.");
        setSearchResults(null);
      } finally {
        setSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, category, perPage]);

  const displayCourses = searchResults !== null ? searchResults : courses;
  const isSearchActive = search && search.trim() !== "";

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
            {loading ? (
              <Skeleton className="h-6 w-full bg-muted-foreground/20" />
            ) : (
              <Select
                value={category}
                onValueChange={setCategory}
                disabled={loading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <Search className="size-4" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Scrollable Course List */}
        <main className="flex-1 overflow-y-auto p-4">
          {searchLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex">
                  <Skeleton className="max-w-[250px] aspect-video w-full" />
                  <div className="flex-1 flex flex-col border p-2 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex space-x-1 mt-auto">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {isSearchActive && displayCourses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg font-medium">
                    No courses found for "{search}"
                  </p>
                  <p className="text-muted-foreground/60 text-sm mt-2">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                displayCourses.map((course) => (
                  <div key={course.id} className="flex">
                    <img
                      src={course.thumbnail_url || ""}
                      alt="Course thumbnail"
                      className="max-w-[250px] aspect-video object-cover border w-full"
                    />
                    <div className="flex-1 flex flex-col border p-2">
                      <p className="uppercase text-xs text-muted-foreground font-medium">
                        By <span>{course.company.name}</span>
                      </p>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-xs text-muted-foreground font-medium">
                        {formatDistance(
                          new Date(course.created_at!),
                          new Date(),
                          {
                            addSuffix: true,
                          }
                        )}
                      </p>
                      <p className="line-clamp-2 text-sm mt-2 text-muted-foreground/80">
                        {course.description}
                      </p>
                      <div className="flex space-x-1 text-violet-500 mt-auto">
                        {course.categories.map((c) => (
                          <div
                            key={c.categoryId}
                            className="border bg-muted rounded-sm  text-sm px-2"
                          >
                            {c.category.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CoursesClient;
