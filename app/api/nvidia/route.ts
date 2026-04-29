import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Extract the API key from the headers sent by the frontend
    const authHeader = req.headers.get('Authorization');
    const apiKey = authHeader?.replace('Bearer ', '');

    if (!apiKey) {
      return NextResponse.json({ error: { message: "NVIDIA API Key is missing." } }, { status: 401 });
    }

    // Forward the request to NVIDIA API
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    // Return the exact status code and data from NVIDIA
    return NextResponse.json(data, { status: response.status });

  } catch (error: any) {
    return NextResponse.json({ error: { message: error.message || "Internal Proxy Server Error" } }, { status: 500 });
  }
}