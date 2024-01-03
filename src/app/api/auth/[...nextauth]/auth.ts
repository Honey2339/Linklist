import NextAuth, {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      if (user?.id) {
        const userBanner = await db.user.findUnique({
          where: { id: user.id },
          select: { banner: true },
        });
        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
            banner: userBanner ?? "",
          },
        };
      } else {
        return session;
      }
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
};
export default NextAuth(authOptions);
