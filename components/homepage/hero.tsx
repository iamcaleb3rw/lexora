import { ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { ThreeDButton } from "../ThreeDButton";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <div className="px-4 md:px-16 min-h-[350px] justify-center  flex gap-8 flex-col">
        <h1 className="text-3xl md:text-5xl font-medium tracking-tighter">
          Learn skills that get you hired. <br className="hidden md:block" />{" "}
          All in One Gamified Platform
        </h1>
        <h2 className="text-xl  max-w-[786px] w-full text-muted-foreground font-medium">
          Say goodbye to boring courses. Say hello to hands-on lessons, quizzes,
          and code challenges that actually get you hired.
        </h2>
        <div className="flex flex-col md:flex-row gap-2 items-center font-normal">
          <Link
            href={"/workspace"}
            className="cursor-pointer  border w-full md:max-w-[300px]"
          >
            <ThreeDButton
              text="Start learning today"
              className="w-full md:max-w-[300px]"
            />
          </Link>

          <Button variant={"ghost"} size={"lg"}>
            <p className="bg-gradient-to-r text-transparent bg-clip-text text-base font-light  from-[black] via-[#000000ad] to-[#0000004c]">
              Introducing Lexora for companies
            </p>
            <ChevronRight className="text-[#0000004c]" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
