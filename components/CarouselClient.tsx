"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import "react-circular-progressbar/dist/styles.css";
import { Card, CardContent } from "./ui/card";
import { StripedPattern } from "@/src/components/magicui/striped-pattern";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Button } from "./ui/button";
import { Course } from "@/src/db/schema";

interface CarouselClientProps {
  courses: Course[];
}

const CarouselClient = ({ courses }: CarouselClientProps) => {
  return (
    <Carousel className="w-full max-w-4xl">
      <CarouselContent className="-ml-1">
        {courses.map((course) => (
          <CarouselItem
            key={course.id}
            className="pl-1 basis-1/2  md:basis-1/3 lg:basis-1/5"
          >
            <div className="p-1">
              <Card className="p-1 min-h-[150px]">
                <CardContent className="flex flex-col p-0">
                  <div className="relative overflow-hidden border-b flex justify-between items-center">
                    <StripedPattern className="[mask-image:radial-gradient(90px_circle_at_center,white,transparent)]" />
                    <div
                      style={{ width: 60, height: 60 }}
                      className="mx-auto z-10"
                    >
                      <CircularProgressbar
                        value={100}
                        styles={buildStyles({
                          pathColor: "fff",
                          trailColor: "#e4e4e7",
                          textColor: "#000",
                        })}
                        text={"100"}
                      />
                    </div>
                  </div>

                  <div className="text-sm my-1 font-medium">{course.title}</div>
                  <Button variant={"outline"} className="mt-auto">
                    Resume course
                  </Button>
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
};

export default CarouselClient;
