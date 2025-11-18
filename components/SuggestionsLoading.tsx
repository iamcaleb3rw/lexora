import React from "react";
import { TextShimmer } from "./ui/text-shimmer";

export default function AIinsetSkeleton() {
  return (
    <div className="h-full flex flex-col bg-white/70 backdrop-blur-xl border-l border-neutral-200 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white/60 backdrop-blur-xl p-3">
        <TextShimmer>Thinking...</TextShimmer>
      </div>

      {/* Body */}
      <div
        className="flex-1 overflow-y-auto px-3 py-2 space-y-4
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-thumb]:bg-neutral-300/70
          [&::-webkit-scrollbar-track]:bg-neutral-100"
      >
        {/* “Rewrite suggestions” title */}
        <div className="h-3 w-28 bg-neutral-200 rounded"></div>

        {/* Multiple suggestion skeletons */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border border-neutral-200 rounded-xl bg-white/60 shadow-sm backdrop-blur-sm"
          >
            {/* BEFORE */}
            <div className="px-3 py-2 border-b border-neutral-200 flex gap-2 items-stretch">
              <div className="w-1 bg-neutral-300 rounded-full"></div>

              <div className="flex-1 space-y-1">
                <div className="h-2 w-10 bg-neutral-200 rounded"></div>
                <div className="h-3 w-full bg-neutral-100 rounded"></div>
              </div>
            </div>

            {/* AFTER */}
            <div className="px-3 py-2 flex gap-2 items-stretch">
              <div className="w-1 bg-neutral-300 rounded-full"></div>

              <div className="flex-1 space-y-1">
                <div className="h-2 w-10 bg-neutral-200 rounded"></div>
                <div className="h-3 w-5/6 bg-neutral-100 rounded"></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 px-3 py-2 border-t border-neutral-200">
              <div className="h-6 w-16 bg-neutral-200 rounded"></div>
              <div className="h-6 w-16 bg-neutral-200 rounded"></div>
            </div>
          </div>
        ))}

        {/* Metrics block */}
        <div className="p-3 bg-white/60 rounded-xl border border-neutral-200 shadow-sm space-y-2">
          <div className="h-3 w-16 bg-neutral-200 rounded"></div>
          <div className="h-3 w-3/4 bg-neutral-100 rounded"></div>
        </div>

        {/* Skills block */}
        <div className="p-3 bg-white/60 rounded-xl border border-neutral-200 shadow-sm space-y-2">
          <div className="h-3 w-10 bg-neutral-200 rounded"></div>
          <div className="h-3 w-2/3 bg-neutral-100 rounded"></div>
        </div>
      </div>

      {/* Input box */}
      <div className="bg-neutral-50/60 border-t border-neutral-200 p-2 flex-shrink-0 backdrop-blur-xl">
        <div className="h-24 w-full bg-neutral-100 rounded-lg"></div>
      </div>
    </div>
  );
}
