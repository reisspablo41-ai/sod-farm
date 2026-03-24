import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const { zipCode } = await request.json();

    if (!zipCode) {
      return NextResponse.json({ error: "Zip Code is required" }, { status: 400 });
    }

    return NextResponse.json({
      zipCode,
      isDeliverable: true,
      message: "Great news! We deliver to your area. Contact us to schedule your delivery."
    });
  } catch {
    return NextResponse.json({ error: "Validation failed" }, { status: 500 });
  }
}
