import { db } from "@/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const allCategories = await db.query.categories.findMany({
      columns: {
        id: true,
        name: true,
      },
    });
    const data = allCategories.map((cat) => ({
      id: cat.id,
      name: cat.name,
    }));
    return NextResponse.json(data);
  } catch (e) {
    console.log(e);
  }
}
