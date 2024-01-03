import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

type userId = string | null | undefined;
type banner = string | null | undefined;

declare module "next-auth/jwt" {
  interface JWT {
    id: userId;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: userId;
      banner: {
        banner: string | null | undefined;
      };
    };
  }
}
