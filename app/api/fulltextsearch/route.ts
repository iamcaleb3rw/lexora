import { fullTextSearch } from "@/app/actions/fulltextsearch";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("search");
    const searchResults = await fullTextSearch(query);
    return NextResponse.json(searchResults);
  } catch (err) {
    return new Response("Error parsing query", { status: 400 });
  }
}
