import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const locations = await prisma.entry.findMany();
    const markers = locations.map((location) => ({
      geocode: [location.latitude, location.longitude] as [number, number],
      popUp: `<b>${location.name}</b><br>${location.description}`,
    }));
    return NextResponse.json(markers);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}
