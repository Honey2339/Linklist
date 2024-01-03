import { NextRequest, NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userEmail, newImage } = await req.json();
  if (userEmail) {
    await db.user.update({
      where: {
        email: userEmail,
      },
      data: {
        image: newImage,
      },
    });
    return NextResponse.json({ Message: "Image Has Been changed" });
  } else {
    console.error("Email not found");
    return NextResponse.json({ Message: "An Error Occured" });
  }
}
