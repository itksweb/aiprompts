import bcrypt from "bcrypt";
import prisma from "@src/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const { name, email, password } = data;
  if (!name || !email || !password) {
    return new NextResponse("Missing fields", { status: 400 });
  }
  const exists = await prisma.user.findUnique({
    where: { email },
  });
  if (exists) {
    throw new Error("Email already exists");
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hash,
    },
  });
  return NextResponse.json(user);
}
