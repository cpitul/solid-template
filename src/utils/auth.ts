import { PrismaAdapter } from "@auth/prisma-adapter";
import { type SolidAuthConfig } from "@auth/solid-start";
import { getSession } from "@auth/solid-start";
import { createServerData$ } from "solid-start/server";
import { prisma } from "~/server/db";
import { serverEnv } from "./env/server";

export const authOpts: SolidAuthConfig = {
    callbacks: {
        signIn() {
            const isAllowedToSignIn = !void 0;
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (!isAllowedToSignIn) {
                return false;
            }

            return true;
        },
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
            }

            return session;
        },
    },
    // @ts-expect-error - createUser type mismatch
    adapter: PrismaAdapter(prisma),
    providers: [
        // GitHub({
        //     clientId: serverEnv.GITHUB_ID,
        //     clientSecret: serverEnv.GITHUB_SECRET
        // }),
    ],
    session: {
        strategy: "database",
        generateSessionToken: () => crypto.randomUUID(),
    },
    debug: serverEnv.NODE_ENV !== "production",
};

export function useSession$() {
    return createServerData$(async (_, event) => getSession(event.request, authOpts), { key: () => "auth_user" });
}
