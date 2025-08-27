import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/database";

// GET all twibbons
export async function GET() {
  try {
    const twibbons = await query("SELECT * FROM twibbons ORDER BY created_at DESC");

    return NextResponse.json({
      success: true,
      data: twibbons,
      count: Array.isArray(twibbons) ? twibbons.length : 0,
    });
  } catch (error) {
    console.error("Error fetching twibbons:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch twibbons" }, { status: 500 });
  }
}

// POST new twibbon (untuk admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasi data
    if (!body.name || !body.url) {
      return NextResponse.json({ success: false, error: "Name and url are required" }, { status: 400 });
    }

    // Insert twibbon baru
    const result = (await query("INSERT INTO twibbons (name, description, filename, url) VALUES (?, ?, ?, ?)", [body.name, body.description || "", body.filename || "", body.url])) as { insertId: number };

    return NextResponse.json(
      {
        success: true,
        message: "Twibbon created successfully",
        data: { id: result.insertId, ...body },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating twibbon:", error);
    return NextResponse.json({ success: false, error: "Failed to create twibbon" }, { status: 500 });
  }
}
