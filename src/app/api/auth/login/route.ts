import { NextResponse } from "next/server";
import { compareSync } from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !compareSync(password, user.passwordHash)) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    await createSession(user.id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
