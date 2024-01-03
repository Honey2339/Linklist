import { NextRequest, NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId, userData } = await req.json();

  const userExist = await db.linkTreeUser.findFirst({
    where: { userId: userId },
  });

  if (!userExist) {
    await db.linkTreeUser.create({
      data: {
        userId: userId,
        displayName: userData.displayName,
        location: userData.location,
        bio: userData.bio,
        avatar: userData.avatar,
        banner: userData.banner,
        linkedIn: userData.linkedIn,
        github: userData.github,
        instagram: userData.instagram,
        youtube: userData.youtube,
      },
    });
    return NextResponse.json({ Message: userData });
  } else if (userExist) {
    await db.linkTreeUser.update({
      where: { userId: userId },
      data: { ...userData },
    });
    return NextResponse.json({ Message: "User Data Updated" });
  } else {
    return NextResponse.json({ Message: "userData route failed" });
  }
}
