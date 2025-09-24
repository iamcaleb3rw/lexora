import { db } from "@/src";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const allCategories = await db.query.categories.findMany();
    const data = allCategories.map((cat) => ({
      id: cat.id,
      name: cat.name,
    }));
    console.log(allCategories);
    return NextResponse.json(data);
  } catch (e) {
    console.log(e);
  }
}
