import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const entries = await prisma.entry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const entry = await prisma.entry.create({
      data: {
        name: body.name,
        latitude: body.latitude,
        longitude: body.longitude,
        description: body.description,
      },
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add entry" }, { status: 500 });
  }
}
