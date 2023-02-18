import { SolidAuth, type SolidAuthConfig } from "@auth/solid-start";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { serverEnv } from "~/env/server";
// import { prisma } from "~/server/db/client";

export const authOpts: SolidAuthConfig = {
    callbacks: {
        signIn() {
            const isAllowedToSignIn = !void 0;
            if (!isAllowedToSignIn) {
                return false;
            }
            return true;
        },
        session({ session, user }) {
            console.log("session?", session);
            console.log("user?", user);

            if (session.user) {
                // @ts-expect-error xD!
                session.user.id = user.id;
            }

            return session;
        },
    },
    // adapter: PrismaAdapter(prisma),
    providers: [
        // GitHub({
        //     clientId: serverEnv.GITHUB_ID,
        //     clientSecret: serverEnv.GITHUB_SECRET
        // }),
        // Discord({
        //     clientId: serverEnv.DISCORD_ID,
        //     clientSecret: serverEnv.DISCORD_SECRET,
        // }),
    ],
    session: {
        strategy: "database",
        generateSessionToken: () => crypto.randomUUID(),
    },
    debug: serverEnv.NODE_ENV !== "production",
};

// eslint-disable-next-line no-empty-pattern
// export const {} = SolidAuth(authOpts);
