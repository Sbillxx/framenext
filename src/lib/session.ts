import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Payload } from "./types";

const auth_secret = process.env.AUTH_SECRET;
if (!auth_secret) {
  throw new Error("Auth Secret environment variable is not set!");
}
const kunci = new TextEncoder().encode(auth_secret);

export const encrypt = async (payload: Payload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3h")
    .sign(kunci);
};

export const decrypt = async (input: string): Promise<Payload> => {
  const { payload } = await jwtVerify(input, kunci, {
    algorithms: ["HS256"],
  });
  return payload as Payload;
};

export const updateSession = async (request: NextRequest) => {
  const session = request.cookies.get("session")?.value;
  if (!session) return NextResponse.next();

  try {
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 3 * 60 * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: parsed.expires,
    });
    return res;
  } catch (error) {
    console.log("Error update session: ", error);
    const res = NextResponse.next();
    res.cookies.delete("session");
    return res;
  }
};

export const getMySession = async (): Promise<Payload | null> => {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
};

export function isSessionExpired(tokenData: Payload): boolean {
  const now = Date.now();
  const expDate = new Date(tokenData.expires).getTime();
  return expDate < now;
}
