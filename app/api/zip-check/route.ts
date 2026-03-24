import { NextResponse } from "next/server";

// Hardcoded list of delivery zip codes for now
const DELIVERY_ZONES = [
  "34201", "34202", "34203", "34205", "34211", "34212", "34215",
  "34221", "34222", "34228", "34231", "34232", "34233", "34234",
  "34235", "34236", "34237", "34238", "34239", "34240", "34241",
  "34242", "34243", "34251", "34285", "34287", "34292", "34293"
];

export async function POST(request: Request) {
  try {
    const { zipCode } = await request.json();

    if (!zipCode) {
      return NextResponse.json({ error: "Zip Code is required" }, { status: 400 });
    }

    const isDeliverable = DELIVERY_ZONES.includes(zipCode);

    return NextResponse.json({
      zipCode,
      isDeliverable,
      message: isDeliverable 
        ? "Success! We deliver to your area." 
        : "Sorry, we don't deliver to that zip code yet. Farm Pickup Only available."
    });
  } catch {
    return NextResponse.json({ error: "Validation failed" }, { status: 500 });
  }
}
