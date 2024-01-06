import { NextRequest, NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId } = await req.json();
  if (userId) {
    const data = await db.userProjects.findMany({
      where: { userId: userId },
      select: { title: true, description: true, link: true },
    });
    return NextResponse.json({ data });
  } else {
    return NextResponse.json({ Message: "User not found" });
  }
}
