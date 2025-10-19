"use client";

import * as React from "react";
import axios from "axios";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Calendar, Calculator, Smile } from "lucide-react";

type SearchResult = {
  id: number;
  type: "course" | "lesson";
  title: string;
};

const DIALOG_HEIGHT = 300; // px

export default function SemanticSearchCommand() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Cmd+J / Ctrl+J hotkey
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Debounced search
  React.useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/search", {
          params: { q: query },
        });
        setResults(data.results || []);
      } catch (err) {
        console.error("[Search] Axios error:", err);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    if (result.type === "course")
      window.location.href = `/courses/${result.id}`;
    else window.location.href = `/lessons/${result.id}`;
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div
          className="flex flex-col  border-2 rounded-md"
          style={{ height: DIALOG_HEIGHT }}
        >
          <CommandInput
            autoFocus
            placeholder="Search courses and lessons..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className="flex-1 overflow-y-auto">
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-10 bg-gray-100 animate-pulse rounded-md my-1 mx-2"
                />
              ))
            ) : results.length === 0 && query ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : results.length === 0 ? (
              <CommandEmpty>Type to search courses and lessons...</CommandEmpty>
            ) : null}

            {results.length > 0 && (
              <CommandGroup heading="Results">
                {results.map((r) => (
                  <CommandItem
                    key={`${r.type}-${r.id}`}
                    onSelect={() => handleSelect(r)}
                  >
                    <span className="truncate">{r.title}</span>
                    <CommandShortcut>{r.type}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            <CommandSeparator />
            <CommandGroup heading="Quick Actions">
              <CommandItem>
                <Calendar />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <Calculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
}
