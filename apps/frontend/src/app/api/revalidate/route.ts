import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidation-secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { model, entry } = body;

    const tagMap: Record<string, string[]> = {
      artwork: ["artworks", ...(entry?.slug ? [`artwork-${entry.slug}`] : [])],
      category: ["categories", "artworks"],
      about: ["about"],
      homepage: ["homepage"],
    };

    const tags = tagMap[model] || [];
    tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));

    return NextResponse.json({ revalidated: true, tags });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
