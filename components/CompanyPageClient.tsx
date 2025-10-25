"use client";
import { getCompanyById } from "@/app/actions/get-company";
import { Company } from "@/server/db/schema";
import Image from "next/image";
import Link from "next/link";
import React, { createContext, useState } from "react";
import { ThreeDButton } from "./ThreeDButton";
import placeholder from "@/public/placeholder.png";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
type CompanyWithCourses = Awaited<ReturnType<typeof getCompanyById>>;
interface CompanyPageClientProps {
  company: CompanyWithCourses;
}

const CompanyPageClient = ({ company }: CompanyPageClientProps) => {
  const [data, setData] = useState("");
  return (
    <div>
      <div className="p-2 flex gap-4 text-lg font-bold">
        {company?.logo_url && (
          <div className="p-2 rounded-md border w-20 h-20  flex items-center justify-center">
            <img
              src={company?.logo_url}
              alt="Company Logo"
              className="w-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col">
          <p>{company?.name}</p>
          <p className="text-muted-foreground text-sm font-medium max-w-[640px] line-clamp-2">
            {company?.description}
          </p>
        </div>
      </div>
      <hr />
      <div className="p-2 text-lg font-medium">
        <p>{company?.name}'s courses</p>
        {company?.courses.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {company.courses.map((course) => (
              <div
                key={course.id}
                className="w-full flex flex-col justify-between  min-h-[250px]"
              >
                <div className="relative h-[50%] border rounded-md border-muted-foreground/10">
                  <Image
                    src={course.thumbnail_url ?? placeholder}
                    alt="Course thumbnail"
                    fill
                    className="rounded-md"
                  />
                </div>
                <div className="mt-1 space-y-2">
                  <p className="text-base font-medium leading-4 line-clamp-2">
                    {course.title}
                  </p>
                  <p className="text-xs  line-clamp-2 font-light text-muted-foreground">
                    {course.description}
                  </p>
                  <div className="">
                    <Link
                      href={`/company-manage/${course.company_id}/courses/${course.id}/lessons`}
                    >
                      <Button className="w-full">Open course</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            <div className="w-full border min-h-[250px]">
              <div className="h-[50%] bg-muted rounded-md"></div>
            </div>
            <div className="w-full border min-h-[250px]">
              <div className="h-[50%] bg-muted rounded-md"></div>
            </div>
            <div className="w-full border min-h-[250px]">
              <div className="h-[50%] bg-muted rounded-md"></div>
            </div>
            <div className="w-full border min-h-[250px]">
              <div className="h-[50%] bg-muted rounded-md"></div>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col items-center justify-center border border-dashed min-h-[250px] bg-muted/40">
            {company?.name} has no published courses yet
            <Link href={`/company-manage/${company?.id}/create-course`}>
              <ThreeDButton text="Create Course +"></ThreeDButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyPageClient;
