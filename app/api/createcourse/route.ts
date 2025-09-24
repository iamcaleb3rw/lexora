import { createCourseWithCategories } from "@/app/actions/create-course";
import { NextResponse } from "next/server";
// the transaction fn

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 API received body:", body);

    const result = await createCourseWithCategories({
      title: body.title,
      description: body.description,
      thumbnailUrl: body.thumbnail_url,
      companyId: body.company_id,
      categories: body.categories.map(Number),
    });

    console.log("✅ API course creation success:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("💥 API course creation error:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
