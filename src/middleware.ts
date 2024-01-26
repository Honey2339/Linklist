import { getToken } from "next-auth/jwt";
import { getSession, useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest, res: NextResponse) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = { matcher: ["/profile", "/mypage", "/analytics"] };
