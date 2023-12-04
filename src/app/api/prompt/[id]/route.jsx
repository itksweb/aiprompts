import prisma from "@src/app/lib/prisma";
import { NextResponse } from "next/server";

//FETCH PROMPT BY ID
export async function GET(req, { params }) {
  const post = await prisma.prompt
    .findUnique({
      where: { id: params?.id },
    })
    .catch((err) => console.log(err));
  console.log(post);
  return NextResponse.json(post);
}

//UPDATE PROMPT BY ID
export async function PATCH(req, { params }) {
  const { prompt, tag } = await req.json();
  const posts = await prisma.prompt
    .update({
      where: { id: params?.id },
      data: { prompt, tag },
    })
    .catch((err) => console.log(err));
  console.log(posts);
  return NextResponse.json(posts);
}

//DELETE PROMPT BY ID
export async function DELETE(req, { params }) {
  const post = await prisma.prompt
    .delete({
      where: { id: params?.id },
    })
    .catch((err) => console.log(err));
  console.log(post);
  return NextResponse.json(post);
}
