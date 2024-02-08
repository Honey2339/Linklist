import { NextRequest, NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId } = await req.json();
  if (userId) {
    const countData = await db.linkTreeUser.findFirst({
      where: { userId: userId },
      select: { count: true },
    });

    if (countData) {
      const currentTime = new Date();
      const currentMonth = currentTime.getMonth();
      const updatedCount = [...countData.count];
      updatedCount[currentMonth] = (updatedCount[currentMonth] || 0) + 1;

      await db.linkTreeUser.updateMany({
        where: { userId: userId },
        data: { count: updatedCount },
      });
    }
  }
  return NextResponse.json({ Message: "Count Increased" });
}
