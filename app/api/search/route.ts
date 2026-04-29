import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");
  if (!query) return NextResponse.json({ results: "" }, { status: 400 });

  let searchContext = "";

  try {
    // ATTEMPT 1: Jina AI Search (JSON format is more stable)
    const response = await fetch(
      `https://s.jina.ai/${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json", // Requesting JSON instead of text
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", // Helps prevent bot blocking
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      // Jina JSON structure: { data: { results: [{ title, url, description }] } }
      if (data.data && data.data.results) {
        data.data.results.slice(0, 4).forEach((res: any) => {
          if (res.description)
            searchContext += `- ${res.title}: ${res.description}\n`;
        });
      }
    } else {
      console.error(
        "Jina Search failed with status:",
        response.status,
        "- Falling back to DuckDuckGo",
      );
    }

    // ATTEMPT 2: DuckDuckGo Fallback (If Jina fails or returns nothing)
    if (!searchContext) {
      const ddgResponse = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`,
      );
      if (ddgResponse.ok) {
        const ddgData = await ddgResponse.json();
        if (ddgData.AbstractText)
          searchContext += `Info: ${ddgData.AbstractText}\n`;
        if (ddgData.RelatedTopics) {
          ddgData.RelatedTopics.slice(0, 3).forEach((t: any) => {
            if (t.Text) searchContext += `- ${t.Text}\n`;
          });
        }
      }
    }

    if (!searchContext)
      searchContext = "No live web results found. Use general knowledge.";

    return NextResponse.json({ results: searchContext });
  } catch (error: any) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { results: "Failed to fetch web results." },
      { status: 500 },
    );
  }
}

export const dynamic = "force-dynamic";
