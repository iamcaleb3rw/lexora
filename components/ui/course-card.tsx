"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

interface CourseCardProps {
  title: string;
  description: string;
  progress: number;
  color?: string;
}

export function CourseCard({
  title,
  description,
  progress,
  color = "#AD46FF",
}: CourseCardProps) {
  const chartData = [{ value: progress, fill: color }];

  const chartConfig = {
    value: {
      label: "Progress",
      color: color,
    },
  } satisfies ChartConfig;

  return (
    <Card className="mb-1">
      <CardContent className="">
        <div className="flex flex-col items-center">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-24 h-24"
          >
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={90 + (progress / 100) * 360}
              innerRadius={35}
              outerRadius={45}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted/20 last:fill-background"
                polarRadius={[40, 30]}
              />
              <RadialBar
                dataKey="value"
                background
                cornerRadius={8}
                fill={color}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-xl font-semibold"
                          >
                            {progress}%
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>

          <div className="text-center space-y-1">
            <h3 className="text-base font-semibold text-balance">{title}</h3>
            <p className="text-xs text-muted-foreground text-balance">
              {description}
            </p>
          </div>

          <Button
            variant={progress === 0 ? "default" : "outline"}
            size="sm"
            className="w-full mt-2"
          >
            {progress === 0
              ? "Start Course"
              : progress === 100
                ? "Review"
                : "Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
