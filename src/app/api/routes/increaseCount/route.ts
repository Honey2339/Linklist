import { NextRequest, NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId } = await req.json();
  if (userId) {
    const countData = await db.linkTreeUser.findFirst({
      where: { userId: userId },
      select: { count: true },
    });
    const currentTime = new Date();
    const currentMonth = currentTime.getMonth();
    await db.linkTreeUser.updateMany({
      where: { userId: userId },
      data: { count: [countData?.count[currentMonth]! + 1] },
    });
  }
  return NextResponse.json({ Message: "Count Increased" });
}
