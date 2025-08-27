import { NextRequest, NextResponse } from "next/server";

// Simulasi database
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

// GET all users
export async function GET() {
  return NextResponse.json({
    users,
    count: users.length,
    status: "success",
  });
}

// POST new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasi data
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Buat user baru
    const newUser = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
    };

    users.push(newUser);

    return NextResponse.json(
      {
        message: "User created successfully!",
        user: newUser,
        status: "success",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 });
  }
}
