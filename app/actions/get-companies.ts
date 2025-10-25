"use server";
import { db } from "@/server";
import { companies } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getCompanies(userId: string) {
  try {
    const result = await db.query.companies.findMany({
      where: eq(companies.owner_id, userId),
    });

    return result;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to get companies");
  }
}
