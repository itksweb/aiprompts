import prisma from "@src/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const post = await req.json();
  const { prompt, tag, userId } = post;

  const newPrompt = await prisma.prompt
    .create({
      data: {
        prompt,
        tag,
        userId,
      },
    })
    .catch((err) => console.log(err));

  console.log(newPrompt);
  return NextResponse.json(newPrompt);
}
