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
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch feedbacks",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// POST new feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📝 Received feedback data:", body);

    // Validasi data
    if (!body.message || !body.from) {
      console.log("❌ Validation failed: missing message or from");
      return NextResponse.json({ success: false, error: "Message and from are required" }, { status: 400 });
    }

    // Test database connection first
    try {
      await query("SELECT 1");
      console.log("✅ Database connection test successful");
    } catch (dbError) {
      console.error("❌ Database connection test failed:", dbError);
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          details: dbError instanceof Error ? dbError.message : "Unknown database error",
        },
        { status: 500 }
      );
    }

    // Cek apakah tabel feedback sudah ada
    try {
      await query("SELECT 1 FROM feedback LIMIT 1");
      console.log("✅ Feedback table exists");
    } catch {
      console.log("🔄 Table doesn't exist, creating...");
      try {
        // Buat tabel jika belum ada
        await query(`
          CREATE TABLE IF NOT EXISTS feedback (
            id INT AUTO_INCREMENT PRIMARY KEY,
            message TEXT NOT NULL,
            from_name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        console.log("✅ Feedback table created successfully");
      } catch (createTableError) {
        console.error("❌ Failed to create feedback table:", createTableError);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to create feedback table",
            details: createTableError instanceof Error ? createTableError.message : "Unknown table creation error",
          },
          { status: 500 }
        );
      }
    }

    // Insert feedback baru
    console.log("💾 Inserting feedback:", { message: body.message, from_name: body.from });

    try {
      const result = (await query("INSERT INTO feedback (message, from_name) VALUES (?, ?)", [body.message, body.from])) as { insertId: number };
      console.log("✅ Insert result:", result);

      return NextResponse.json(
        {
          success: true,
          message: "Feedback submitted successfully",
          data: {
            id: result.insertId,
            message: body.message,
            from_name: body.from,
            created_at: new Date().toISOString(),
          },
        },
        { status: 201 }
      );
    } catch (insertError) {
      console.error("❌ Failed to insert feedback:", insertError);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to insert feedback",
          details: insertError instanceof Error ? insertError.message : "Unknown insert error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Error in POST /api/feedback:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit feedback",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
