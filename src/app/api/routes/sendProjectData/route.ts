import { NextRequest, NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId, userProjects } = await req.json();
  const userExist = await db.linkTreeUser.findFirst({
    where: { userId: userId },
  });
  if (userExist) {
    await db.userProjects.create({
      data: {
        userId: userId,
        title: userProjects.title,
        description: userProjects.description,
        link: userProjects.link,
      },
    });
  } else {
    return NextResponse.json({ Message: "User not found" });
  }
  return NextResponse.json({ Message: "Added a new project" });
}
