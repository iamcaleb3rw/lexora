import * as React from "react";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartContainer } from "./chart";

export function CourseCarousel() {
  return (
    <Carousel className="w-full max-w-4xl">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5"
          >
            <div className="p-1">
              <Card className="p-1">
                <CardContent className="flex flex-col p-0">
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      value={100 / (index + 1)}
                      styles={buildStyles({
                        pathColor: "#8b5cf6",
                        trailColor: "#f5f3ff",
                      })}
                      text={"100"}
                    />
                  </div>
                  <div className="text-sm">
                    Introduction to SwiftUI: A deepdive
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
