"use server";
import { db } from "@/src";
import { companies, courses } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function getCompanyById(companyId: any) {
  try {
    const result = await db.query.companies.findFirst({
      where: eq(companyId, companies.id),
      with: {
        courses: {
          limit: 8,
        },
      },
    });

    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("The requested company failed to fetch");
  }
}
