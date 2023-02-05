import { SolidAuth, type SolidAuthConfig } from "@auth/solid-start";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { serverEnv } from "~/env/server";
import { prisma } from "~/server/db/client";

export const authOpts: SolidAuthConfig = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    // // @ts-expect-error types error
    // GitHub({ clientId: serverEnv.GITHUB_ID, clientSecret: serverEnv.GITHUB_SECRET }),
    // // @ts-expect-error types error
    // Discord({
    //   clientId: serverEnv.DISCORD_ID,
    //   clientSecret: serverEnv.DISCORD_SECRET,
    // }),
  ],
  session: {
    strategy: "database",
    generateSessionToken: () => crypto.randomUUID(),
  },
  debug: serverEnv.NODE_ENV !== "production",
};

export const { GET, POST } = SolidAuth(authOpts);
