import { NextRequest, NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { title, userId } = await req.json();
  const findUser = await db.linkTreeUser.findFirst({
    where: { userId: userId },
  });
  if (findUser) {
    const findTitle = await db.userProjects.deleteMany({
      where: { title: title },
    });
    return NextResponse.json({ Message: "Deleted the project" });
  } else {
    return NextResponse.json({ Message: "User not found" });
  }
}
