"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <section>
      <h1>Dashboard page</h1>
      {session?.user && <h2>Hi {session?.user.name}</h2>}
      {!session?.user && <Link href="/login">Please login</Link>}
    </section>
  );
}
