import { NextRequest, NextResponse } from "next/server";

// GET endpoint
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Hello from TWIBON API!",
    timestamp: new Date().toISOString(),
    status: "success",
  });
}

// POST endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    return NextResponse.json({
      message: "Data received successfully!",
      data: body,
      timestamp: new Date().toISOString(),
      status: "success",
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 });
  }
}
