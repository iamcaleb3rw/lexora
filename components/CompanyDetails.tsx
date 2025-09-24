// import Link from "next/link";
// import React from "react";
// import { ThreeDButton } from "./ThreeDButton";
// import { CompanyPageSkeleton } from "./loaders/CompanyPageLoading";
// import { getCompanyById } from "@/app/actions/get-company";
// import { redirect } from "next/navigation";

// const CompanyDetails = async ({ companyId }: { companyId: string }) => {
//   const company = await getCompanyById(companyId);
//   if (!company) {
//     return redirect("/create-company");

//   const logoUrl = company[0].logo_url;
//   return (
//     <div>
//       <div className="p-2 flex gap-5">
//         <div className="border w-20 flex items-center justify-center aspect-square p-3 rounded-2xl">
//           {logoUrl ? (
//             <img src={logoUrl} alt="My Image" className="w-14" />
//           ) : (
//             <p>No image available</p>
//           )}
//         </div>
//         <div>
//           <p className="text-xl font-medium tracking-tight">
//             {company[0].logo_url}
//           </p>
//           <p className="font-medium text-muted-foreground max-w-[640px]">
//             {company[0].description}
//           </p>
//         </div>
//       </div>
//       <hr />
//       <div>
//         <div className="p-2">
//           <h1 className="text-xl font-medium">
//             {company[0].name}'s published courses
//           </h1>
//           <div className=" flex flex-col items-center justify-center border border-dashed min-h-[250px] bg-muted/40">
//             Twigane has no published courses yet
//             <Link href={`/company-manage/${companyId}/create-course`}>
//               <ThreeDButton text="Create Course +"></ThreeDButton>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyDetails;
