import { NextRequest, NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId } = await req.json();
  if (userId) {
    const getUserData = await db.linkTreeUser.findFirst({
      where: { userId },
      select: {
        userId: true,
        avatar: true,
        banner: true,
        displayName: true,
        location: true,
        bio: true,
        linkedIn: true,
        github: true,
        youtube: true,
        instagram: true,
      },
    });
    return NextResponse.json({ Message: getUserData });
  }
}
