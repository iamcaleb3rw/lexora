import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import UploadIllustration from "@/public/upload.png";
import AnalyzeIllustration from "@/public/analyze.png";
import BuildIllustration from "@/public/build.png";
import Image from "next/image";

const Steps = () => {
  return (
    <div className=" px-4 md:px-16 py-10 flex flex-col gap-12">
      <div className="grid md:grid-cols-2">
        <h1 className="text-3xl md:text-5xl md:max-w-[500px] col-span-full md:col-span-1 w-full font-medium tracking-tighter ">
          Made for ambitious learners and future tech professionals.
        </h1>
        <div className="text-muted-foreground w-full max-w-full  md:max-w-[350px] md:w-full">
          Cognitio helps job seekers learn real tech skills faster and get hired
          quicker. Complete challenges designed by top companies, earn XP, and
          showcase your talent — all through a fun, gamified experience.
          <span className="">
            <Link
              href={"#"}
              className="inline-flex group items-center justify-center font-medium text-foreground"
            >
              Start research now
              <ChevronRight className="text-foreground group-hover:translate-x-1 transition h-4 w-4" />
            </Link>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap sm:flex-nowrap justify-evenly gap-3 place-items-center">
        <div className="w-full py-6 px-6 aspect-square bg-muted border  rounded-[30px]">
          <div className=" flex items-center gap-3">
            <div className="w-4 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-blue-500">Enroll</p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={UploadIllustration}
              alt="Upload Illustration"
              width={300}
              className=""
            />
          </div>
          <div className="text-xl  font-medium">
            <p>Join a pathway, learn and practice in-demand skills</p>
          </div>
        </div>
        <div className="w-full py-6 px-6 aspect-square bg-muted border  rounded-[30px]">
          <div className="flex items-center gap-3">
            <div className="w-4 h-2 bg-orange-500 rounded-full"></div>
            <p className="text-orange-500">Practice</p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={AnalyzeIllustration}
              alt="Upload Illustration"
              width={300}
              className=""
            />
          </div>
          <div className="text-xl tracking-tight   font-medium">
            <p>Complete challenges and earn XPs, and badges</p>
          </div>
        </div>
        <div className="w-full py-6 px-6 aspect-square bg-muted border  rounded-[30px]">
          <div className="flex items-center gap-3">
            <div className="w-4 h-2 bg-purple-500 rounded-full"></div>
            <p className="text-purple-500">Get hired</p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={BuildIllustration}
              alt="Upload Illustration"
              width={300}
              className=""
            />
          </div>
          <div className="text-xl tracking-tight   font-medium">
            <p>Get job offers from employers based on your profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
