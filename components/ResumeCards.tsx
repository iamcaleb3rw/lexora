import { ResumeInfoType } from "@/app/actions/get-resumes";
import Link from "next/link";
import React from "react";

interface ResumeCardsProps {
  resumes: ResumeInfoType;
}

const ResumeCards = ({ resumes }: ResumeCardsProps) => {
  return (
    <div className="grid grid-cols-5 mt-5 gap-4">
      {resumes.map((resume) => (
        <Link href={`/workspace/cv/${resume.id}`} key={resume.id}>
          <div className="col-span-1 cursor-pointer border  hover:scale-[1.004] transition-transform duration-[3s] rounded-lg">
            <div className=" bg-muted-foreground/8 flex items-center justify-center  text-2xl cursor-pointer border-b rounded-lg min-h-[250px]">
              {resume.job_title.charAt(0)}
            </div>
            <p className="text-center text-sm font-medium">
              {resume.job_title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ResumeCards;
