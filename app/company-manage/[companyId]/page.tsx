import { getCompanyById } from "@/app/actions/get-company";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { headers } from "next/headers";
import React from "react";
import Image from "next/image";
import { Button } from "@react-email/components";
import { ThreeDButton } from "@/components/ThreeDButton";
import Link from "next/link";

const CompanyPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { companyId } = await params;
  const company = await getCompanyById(companyId);
  const logoUrl: string | null = company[0].logo_url;
  if (!company) {
    return redirect("/");
  }
  return (
    <div>
      <div className="p-2 flex gap-5">
        <div className="border w-fit aspect-square p-3 rounded-2xl">
          {logoUrl ? (
            <img src={logoUrl} alt="My Image" className="w-14" />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div>
          <p className="text-xl font-medium tracking-tight">
            {company[0].name}
          </p>
          <p className="font-medium text-muted-foreground max-w-[640px]">
            {company[0].description}
          </p>
        </div>
      </div>
      <hr />
      <div>
        <div className="p-2">
          <h1 className="text-xl font-medium">Twigane's published courses</h1>
          <div className=" flex flex-col items-center justify-center border border-dashed min-h-[250px] bg-muted/40">
            Twigane has no published courses yet
            <Link href={`/company-manage/${companyId}/create-course`}>
              <ThreeDButton text="Create Course +"></ThreeDButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
