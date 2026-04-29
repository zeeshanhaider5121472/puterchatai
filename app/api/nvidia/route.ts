import { NextResponse } from 'next/server';

// THIS MUST BE EXPORTED EXACTLY LIKE THIS
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract the API key from the headers sent by the frontend
    const authHeader = request.headers.get('Authorization');
    const apiKey = authHeader?.replace('Bearer ', '');

    if (!apiKey) {
      return NextResponse.json({ error: { message: "NVIDIA API Key is missing from request." } }, { status: 401 });
    }

    // Forward the request to NVIDIA API
    const nvidiaResponse = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Safely parse NVIDIA's response
    const data = await nvidiaResponse.json();
    
    // Return the exact status code and data from NVIDIA
    return NextResponse.json(data, { status: nvidiaResponse.status });

  } catch (error: any) {
    console.error("NVIDIA Proxy Error:", error);
    return NextResponse.json({ error: { message: error.message || "Internal Proxy Server Error" } }, { status: 500 });
  }
}

// Next.js requires this to explicitly allow POST requests on this route
export const dynamic = 'force-dynamic';