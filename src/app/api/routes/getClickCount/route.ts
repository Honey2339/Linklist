import { NextRequest, NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/db";
import { startOfMonth, endOfMonth } from "date-fns";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId } = await req.json();
  if (userId) {
    const countData = await db.linkTreeUser.findFirst({
      where: { userId: userId },
      select: { count: true },
    });
    return NextResponse.json({ countData });
  } else {
    return NextResponse.json({ Message: "User not found" });
  }
}
