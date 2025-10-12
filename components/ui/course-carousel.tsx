import * as React from "react";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { Button } from "./button";
import { StripedPattern } from "@/src/components/magicui/striped-pattern";

export function CourseCarousel() {
  const colors = ["#2B7FFF", "#FF6900", "#a855f7"];
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
                  <div className="relative overflow-hidden border-b flex justify-between items-center">
                    <StripedPattern className="[mask-image:radial-gradient(90px_circle_at_center,white,transparent)]" />
                    <div
                      style={{ width: 60, height: 60 }}
                      className="mx-auto z-10"
                    >
                      <CircularProgressbar
                        value={100 / (index + 1)}
                        styles={buildStyles({
                          pathColor: colors[index % colors.length],
                          trailColor: "#e4e4e7",
                          textColor: colors[index % colors.length],
                        })}
                        text={"100"}
                      />
                    </div>
                  </div>

                  <div className="text-sm my-1 font-medium">
                    Introduction to SwiftUI: A deepdive
                  </div>
                  <Button variant={"outline"}>Resume course</Button>
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
