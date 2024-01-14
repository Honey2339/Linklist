import { NextRequest, NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId, userProjects } = await req.json();
  const userExist = await db.linkTreeUser.findFirst({
    where: { userId: userId },
  });
  if (userExist) {
    const count = await db.userProjects.count({ where: { userId: userId } });
    if (count < 4) {
      await db.userProjects.create({
        data: {
          userId: userId,
          title: userProjects.title,
          description: userProjects.description,
          link: userProjects.link,
        },
      });
    } else {
      return NextResponse.json({ Message: "You can only show 4 projects" });
    }
  } else {
    return NextResponse.json({ Message: "User not found" });
  }
  return NextResponse.json({ Message: "Added a new project" });
}
