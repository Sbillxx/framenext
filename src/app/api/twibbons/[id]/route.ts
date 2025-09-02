import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/database";

// GET twibbon by ID
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await context.params;
    const id = parseInt(idParam);

    console.log("Fetching twibbon with ID:", id);

    const twibbons = await query("SELECT * FROM twibbons WHERE id = ?", [id]);
    console.log("Query result:", twibbons);

    if (!Array.isArray(twibbons) || twibbons.length === 0) {
      console.log("Twibbon not found for ID:", id);
      return NextResponse.json({ success: false, error: "Twibbon not found" }, { status: 404 });
    }

    console.log("Twibbon found:", twibbons[0]);
    return NextResponse.json({
      success: true,
      data: twibbons[0],
    });
  } catch (error) {
    console.error("Error fetching twibbon:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch twibbon" }, { status: 500 });
  }
}

// PUT update twibbon downloads/shares
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await request.json();

    // Update downloads atau shares
    if (body.action === "download") {
      await query("UPDATE twibbons SET downloads = downloads + 1 WHERE id = ?", [id]);
    } else if (body.action === "share") {
      await query("UPDATE twibbons SET shares = shares + 1 WHERE id = ?", [id]);
    }

    return NextResponse.json({
      success: true,
      message: "Twibbon updated successfully",
    });
  } catch (error) {
    console.error("Error updating twibbon:", error);
    return NextResponse.json({ success: false, error: "Failed to update twibbon" }, { status: 500 });
  }
}
