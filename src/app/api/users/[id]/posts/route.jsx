import prisma from "@src/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const posts = await prisma.prompt
    .findMany({
      where: { userId: params?.id },
      include: {
        user: {
          select: { image: true, name: true, email: true },
        },
      },
    })
    .catch((err) => console.log(err));
  console.log(posts);
  return NextResponse.json(posts);
}
