"use client";

import * as React from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar, Calculator, Smile, Search, Command, X } from "lucide-react";
import { TextShimmer } from "./ui/text-shimmer";

type SearchResult = {
  id: number;
  type: "course" | "lesson";
  title: string;
};

const DIALOG_HEIGHT = 500;
const MAX_VISIBLE_RESULTS = 10;
const SKELETON_ITEMS = 6;

// Custom hook for search
function useSearch() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const queryRef = React.useRef(query);
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    queryRef.current = query;
  }, [query]);

  const performSearch = React.useCallback(async (searchQuery: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    if (!searchQuery.trim()) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "/api/search",
        { query: searchQuery },
        {
          signal: abortControllerRef.current.signal,
          timeout: 10000,
        }
      );

      if (queryRef.current !== searchQuery) {
        return;
      }

      if (response.status === 200) {
        const { courses = [], lessons = [] } = response.data;

        const formattedResults: SearchResult[] = [
          ...courses.map((c: any) => ({
            id: c.id,
            type: "course" as const,
            title: c.title,
          })),
          ...lessons.map((l: any) => ({
            id: l.id,
            type: "lesson" as const,
            title: l.title,
          })),
        ];

        setResults(formattedResults);
      }
    } catch (err: any) {
      if (
        err.name === "AbortError" ||
        err.name === "CanceledError" ||
        axios.isCancel(err)
      ) {
        return;
      }

      setError(err.message || "Search failed");
      setResults([]);
    } finally {
      if (queryRef.current === searchQuery) {
        setLoading(false);
      }
    }
  }, []);

  const debouncedSearch = React.useCallback(
    (newQuery: string) => {
      setQuery(newQuery);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      if (!newQuery.trim()) {
        setResults([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);

      searchTimeoutRef.current = setTimeout(() => {
        performSearch(newQuery);
      }, 300);
    },
    [performSearch]
  );

  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const resetSearch = React.useCallback(() => {
    setQuery("");
    setResults([]);
    setLoading(false);
    setError(null);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    query,
    results,
    loading,
    error,
    search: debouncedSearch,
    resetSearch,
  };
}

// Skeleton Loader Component
const SearchSkeleton = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b bg-muted/30 shrink-0">
        <div className="text-sm font-medium">
          <TextShimmer duration={0.7}>Searching...</TextShimmer>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-1">
        {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 text-sm border-b border-border/50"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.5s ease-out forwards",
              opacity: 0,
              transform: "translateY(10px)",
            }}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
              <div className="space-y-2 flex-1">
                <div
                  className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"
                  style={{
                    width: `${70 + (index % 3) * 10}%`,
                    animationDelay: `${index * 150}ms`,
                  }}
                />
                <div
                  className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"
                  style={{
                    width: `${40 + (index % 4) * 5}%`,
                    animationDelay: `${index * 150 + 100}ms`,
                  }}
                />
              </div>
            </div>
            <div
              className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md animate-pulse"
              style={{
                animationDelay: `${index * 150 + 200}ms`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Result Item Component with fade-in animation
const ResultItem = ({
  result,
  index,
}: {
  result: SearchResult;
  index: number;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 80); // Staggered delay

    return () => clearTimeout(timer);
  }, [index]);

  const handleSelect = (result: SearchResult) => {
    if (result.type === "course") {
      window.location.href = `/courses/${result.id}`;
    } else {
      window.location.href = `/lessons/${result.id}`;
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 text-sm border-b border-border/50 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all duration-300 ${
        isVisible
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-4"
      }`}
      onClick={() => handleSelect(result)}
      style={{
        transitionDelay: `${index * 20}ms`,
      }}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div
          className={`w-2 h-2 rounded-full shrink-0 ${
            result.type === "course" ? "bg-blue-500" : "bg-orange-500"
          }`}
        />
        <span className="truncate flex-1">{result.title}</span>
      </div>
      <span className="text-xs text-muted-foreground capitalize px-2 py-1 bg-muted rounded-md shrink-0 ml-2">
        {result.type}
      </span>
    </div>
  );
};

export default function SemanticSearchDialog() {
  const [open, setOpen] = React.useState(false);
  const { query, results, loading, error, search, resetSearch } = useSearch();

  // Keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }

      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Reset when dialog closes
  React.useEffect(() => {
    if (!open) {
      resetSearch();
    }
  }, [open, resetSearch]);

  const visibleResults = results.slice(0, MAX_VISIBLE_RESULTS);

  return (
    <>
      {/* Keyboard shortcut hint */}
      <div className="fixed bottom-4 right-4 bg-background border rounded-lg px-3 py-2 text-sm text-muted-foreground shadow-sm hidden md:block">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">
            {navigator.platform.includes("Mac") ? "⌘" : "Ctrl +"}J
          </span>
        </kbd>{" "}
        to search
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-stagger-fade-in {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="font-medium text-sm  w-full flex">
          Search
        </DialogTrigger>
        <DialogOverlay className="bg-white/40 backdrop-blur-[2px]" />
        <DialogTitle className="m-0 p-0" />
        <DialogContent
          className="p-0 gap-0 max-w-2xl overflow-hidden rounded-lg"
          style={{ height: DIALOG_HEIGHT }}
          showCloseButton={false}
        >
          {/* Custom Header */}
          <div className="relative flex items-center border-b px-4 py-3 bg-muted/50">
            <div
              className="absolute -inset-px rounded-2xl blur-2xl -z-10"
              style={
                {
                  "--angle": "0deg",
                  background:
                    "conic-gradient(from var(--angle), #67e8f9, #38bdf8, #3b82f6, #4f46e5, #8b5cf6, #9333ea, #ec4899, #f43f5e, #f97316, #67e8f9)",
                  animation: "rotateGradient 20s linear infinite",
                } as any
              }
            />
            <div className="flex items-center gap-2 flex-1 mr-10">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <Input
                autoFocus
                placeholder="Search courses and lessons..."
                value={query}
                onChange={(e) => search(e.target.value)}
                className="flex h-8 w-full rounded-md bg-background px-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Custom close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute border bg-white right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>

            {/* Keyboard shortcut badge */}
          </div>

          {/* Main Content Area */}
          <div
            className="flex flex-col overflow-hidden"
            style={{ height: `calc(${DIALOG_HEIGHT}px - 3rem)` }}
          >
            {/* Loading State - Skeleton */}
            {loading && <SearchSkeleton />}

            {/* Error State */}
            {error && !loading && (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-destructive font-medium mb-2">
                    Search Error
                  </div>
                  <div className="text-sm text-muted-foreground">{error}</div>
                  <button
                    onClick={() => search(query)}
                    className="mt-4 text-xs text-blue-500 hover:text-blue-600"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Results State */}
            {!loading && !error && results.length > 0 && (
              <div className="flex flex-col h-full">
                <div className="px-4 py-3 border-b bg-muted/30 shrink-0">
                  <div className="text-sm font-medium">
                    Search Results ({results.length})
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="py-1">
                    {visibleResults.map((result, index) => (
                      <ResultItem
                        key={`${result.type}-${result.id}-${index}`}
                        result={result}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Empty State - No Results */}
            {!loading && !error && query && results.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 animate-fade-in">
                <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  No results found for "{query}"
                </p>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}

            {/* Initial State - No Query */}
            {!loading && !error && !query && (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Search Courses & Lessons
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Find exactly what you're looking for by searching through
                      all available courses and lessons.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4 pt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Command className="h-3 w-3" />
                      <span>J</span>
                      <span>to open</span>
                    </div>
                    <div className="w-px h-4 bg-border" />
                    <div className="flex items-center gap-1">
                      <span>ESC</span>
                      <span>to close</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions - Only show when no active search */}
            {!loading && !error && !query && (
              <div className="border-t mt-auto">
                <div className="px-4 py-3 bg-muted/30">
                  <div className="text-sm font-medium">Quick Actions</div>
                </div>
                <div className="p-2">
                  {[
                    {
                      icon: Calendar,
                      label: "Calendar",
                      action: () => console.log("Calendar"),
                    },
                    {
                      icon: Smile,
                      label: "Search Emoji",
                      action: () => console.log("Emoji"),
                    },
                    {
                      icon: Calculator,
                      label: "Calculator",
                      action: () => console.log("Calculator"),
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                      onClick={() => {
                        setOpen(false);
                        item.action();
                      }}
                    >
                      <item.icon className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
