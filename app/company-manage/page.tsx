import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCompanies } from "../actions/get-companies";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ExternalLink, FolderEdit, Link2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MyCompanies = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const companies = await getCompanies(session.user.id);
  console.log("COMPANIES", companies);
  return (
    <div>
      <div className="grid grid-cols-4 gap-3 p-3">
        {companies.map((company) => (
          <div
            key={company.id}
            className="min-h-[150px] flex flex-col justify-between border rounded-xl shadow-xs p-2"
          >
            <div className="flex items-center gap-3">
              {company.logo_url && (
                <img src={company.logo_url} className="h-8"></img>
              )}

              <div>
                <p className="text-sm">{company.name}</p>
                <Link
                  href={`/company-manage/${company.id}`}
                  className="flex items-center text-xs underline"
                >
                  <ExternalLink className="size-[14px]" />
                  Go to company page
                </Link>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {company.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/company-manage/${company.id}/courses`}
                className="flex-1 cursor-pointer"
              >
                <Button className="w-full cursor-pointer">
                  <FolderEdit className="size-4 " />
                  Manage Courses
                </Button>
              </Link>

              <Button variant={"outline"} size={"icon"} className="size-9">
                <Settings />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCompanies;
