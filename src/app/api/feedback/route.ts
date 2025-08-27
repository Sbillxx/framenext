import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/database";

// GET all feedbacks
export async function GET() {
  try {
    const feedbacks = await query("SELECT * FROM feedback ORDER BY created_at DESC");

    return NextResponse.json({
      success: true,
      data: feedbacks,
      count: Array.isArray(feedbacks) ? feedbacks.length : 0,
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch feedbacks" }, { status: 500 });
  }
}

// POST new feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasi data
    if (!body.message || !body.from) {
      return NextResponse.json({ success: false, error: "Message and from are required" }, { status: 400 });
    }

    // Insert feedback baru
    const result = (await query("INSERT INTO feedback (message, name) VALUES (?, ?)", [body.message, body.from])) as { insertId: number };

    return NextResponse.json(
      {
        success: true,
        message: "Feedback submitted successfully",
        data: { id: result.insertId, message: body.message, from: body.from },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating feedback:", error);
    return NextResponse.json({ success: false, error: "Failed to submit feedback" }, { status: 500 });
  }
}
