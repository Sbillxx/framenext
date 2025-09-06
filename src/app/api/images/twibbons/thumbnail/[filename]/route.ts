import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  props: { params: Promise<{ filename: string }> }
) {
  const params = await props.params;
  const fileName = params.filename;
  const filePath = path.join(process.cwd(), "public/thumbnail/", fileName);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  return new NextResponse(fileBuffer, {
    status: 200,
  });
}
