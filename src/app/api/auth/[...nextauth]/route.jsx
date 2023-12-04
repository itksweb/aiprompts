import NextAuth from "next-auth/next";
import prisma from "@src/app/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password" },
        name: { label: "name", type: "text", placeholder: "name" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        // if (!email || !password) {
        //   throw new Error("Please enter Email and password");
        // }
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user || !user?.hash) {
          throw new Error("No user found");
        }
        const passwordMatch = await bcrypt.compare(password, user.hash);
        if (!passwordMatch) {
          throw new Error("incorrect password");
        }
        return user;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },

  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV == "!production",
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
