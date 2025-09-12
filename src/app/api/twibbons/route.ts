import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/database";

// GET all twibbons
export async function GET() {
  try {
    console.log("Fetching all twibbons...");
    const twibbons = await query("SELECT * FROM twibbons ORDER BY created_at DESC");
    console.log("All twibbons:", twibbons);

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

// POST create new twibbon or handle update/delete
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, id, name, description, url, slug } = body;

    // Handle update action
    if (action === "update" && id) {
      await query("UPDATE twibbons SET name = ?, description = ?, slug = ? WHERE id = ?", [name, description, slug, id]);
      return NextResponse.json({
        success: true,
        message: "Twibbon updated successfully",
      });
    }

    // Handle delete action
    if (action === "delete" && id) {
      await query("DELETE FROM twibbons WHERE id = ?", [id]);
      return NextResponse.json({
        success: true,
        message: "Twibbon deleted successfully",
      });
    }

    // Default: create new twibbon
    await query("INSERT INTO twibbons (name, description, url, downloads, shares, created_at) VALUES (?, ?, ?, 0, 0, NOW())", [name, description, url]);

    return NextResponse.json({
      success: true,
      data: { name, description, url },
    });
  } catch (error) {
    console.error("Error handling twibbon:", error);
    return NextResponse.json({ success: false, error: "Failed to handle twibbon operation" }, { status: 500 });
  }
}
