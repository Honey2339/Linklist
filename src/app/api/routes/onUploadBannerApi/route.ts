import { NextRequest, NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userEmail, newBanner } = await req.json();
  if (userEmail) {
    await db.user.update({
      where: {
        email: userEmail,
      },
      data: {
        banner: newBanner,
      },
    });
    return NextResponse.json({ Message: "Banner Has Been changed" });
  } else {
    console.error("Email not found");
    return NextResponse.json({ Message: "Banner Error Occured" });
  }
}
