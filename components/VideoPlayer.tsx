"use client";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Skeleton } from "./ui/skeleton";

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative w-full aspect-video">
      {!isReady && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-md bg-muted-foreground/20" />
      )}
      <ReactPlayer
        src={videoUrl}
        width="100%"
        height="100%"
        controls
        className="rounded-md"
        onReady={() => setIsReady(true)}
      />
    </div>
  );
};

export default VideoPlayer;
