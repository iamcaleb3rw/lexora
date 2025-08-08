"use server";
import { db } from "@/src";
import { companies } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function getCompanyById(companyId: any) {
  try {
    const result = await db
      .select()
      .from(companies)
      .where(eq(companyId, companies.id));
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("The requested company failed to fetch");
  }
}
