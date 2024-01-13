import NextAuth, {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import cuid from "cuid";

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id;
      }
      return token
    },
    session: async ({ session , token}) => {
      if (token.uid) {
        session.user.id = token.uid;
      }
      if (session.user.id) {
        const userBanner = await db.user.findUnique({
          where: { id: session.user.id },
          select: { banner: true },
        });
        return {
          ...session,
          user: {
            ...session.user,
            id: session.user.id,
            banner: userBanner?.banner ?? "",
          },
        };
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialProvider({
      name: "creds",
      credentials: {
        name: {},
        password: {},
        email: {},
      },
      async authorize(credentials, req) {
        const { name, email, password } = credentials as {
          name: string;
          email: string;
          password: string;
        };
        if (!email && !password) {
          return null;
        }
        const userExist = await db.user.findFirst({
          where: { email },
          select: { id: true, email: true, name: true, password: true },
        });
        if (userExist) {
          if (userExist.password == password) {
            return {
              id: userExist.id,
              name: userExist.name,
              email: userExist.email,
            };
          }
        }
        if (!userExist) {
          const userId = cuid();
          const user = await db.user.create({
            data: {
              id: userId,
              email: email,
              name: name,
              password: password,
              image: null,
              banner: null,
            },
          });
          return { id: userId, name: name, email: email };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/register" },
  session: {
    strategy: "jwt",
  },
};
export default NextAuth(authOptions);
