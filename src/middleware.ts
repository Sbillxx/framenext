import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/_next/image")) {
    return NextResponse.next();
  }
  return await updateSession(request);
}
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image).*)"],
// };

export const config = {
  matcher: [
    // Exclude image optimization routes
    "/((?!_next/image|api|_next/static).*)",
  ],
};
