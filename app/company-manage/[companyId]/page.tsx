import { getCompanyById } from "@/app/actions/get-company";
import CompanyPageClient from "@/components/CompanyPageClient";
import { CompanyPageSkeleton } from "@/components/loaders/CompanyPageLoading";
import { ThreeDButton } from "@/components/ThreeDButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

import React, { Suspense } from "react";

const CompanyPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const id = (await params).companyId;
  const company = await getCompanyById(id);
  const userOwnsCompany = company?.owner_id === session?.user.id;
  console.log(userOwnsCompany);

  return (
    <div className="w-full">
      <div className="border-b py-2 bg-white/40 backdrop-blur-md flex justify-end px-4 z-20   sticky top-0">
        {userOwnsCompany && (
          <Link href={`/company-manage/${id}/create-course`}>
            <ThreeDButton text="Create Course" />
          </Link>
        )}
      </div>
      <CompanyPageClient company={company} />
    </div>
  );
};

export default CompanyPage;
