"use client";

import { ReactNode } from "react";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import "dotenv/config";

export function Room({ children }: { children: ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_KEY!;

  return (
    <LiveblocksProvider publicApiKey={apiKey}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
