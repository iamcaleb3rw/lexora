"use server";
import { db } from "@/server";
import { companies } from "@/server/db/schema";

export async function createCompany(
  name: string,
  description: string,
  logoUrl: string,
  emailadress: string,
  ownerId: string
) {
  try {
    console.log("received", name, description, logoUrl, emailadress);
    const result = await db
      .insert(companies)
      .values({
        name: name,
        email: emailadress,
        logo_url: logoUrl,
        owner_id: ownerId,
        description: description,
      })
      .returning({ insertedId: companies.id });

    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to create company");
  }
}
