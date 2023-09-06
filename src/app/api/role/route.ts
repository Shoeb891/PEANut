import { prisma } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const faculty = "faculty";
    const isFaculty = await prisma.faculty.findFirst({
      where: {
        role: faculty,
      },
    });

    console.log(isFaculty?.role);

    return NextResponse.json(
      {
        message: isFaculty,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function findRole() {
  const faculty = "faculty";
  const isFaculty = await prisma.faculty.findFirst({
    where: {
      role: faculty,
    },
  });

  return isFaculty?.role;
}
