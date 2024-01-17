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
      return token;
    },
    session: async ({ session, token }) => {
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
        const { name, email, password, flag } = credentials as {
          name: string;
          email: string;
          password: string;
          flag: number;
        };
        if (!email || !password) {
          return null;
        }
        const userExist = await db.user.findFirst({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            banner: true,
            image: true,
          },
        });

        //Login Attempt
        if (flag == 98) {
          if (userExist) {
            if (userExist.password == password) {
              return {
                id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                image: userExist.image,
                banner: userExist.banner,
              };
            } else {
              throw new Error("Invalid Credentials");
            }
          }
        }
        // Register Attempt
        if (flag == 99) {
          if (!userExist) {
            const userId = cuid();
            if (password && email && name) {
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
            }
            return { id: userId, name: name, email: email };
          }
        }
        return null;
      },
    }),
  ],
  pages: { newUser: "/register", signIn: "/login" },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60,
  },
};
export default NextAuth(authOptions);
