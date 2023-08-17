import { PrismaAdapter } from "@auth/prisma-adapter";
import { type SolidAuthConfig } from "@auth/solid-start";
import { getSession } from "@auth/solid-start";
import { createServerData$ } from "solid-start/server";
import { prisma } from "~/server/db";
import { serverEnv } from "./env/server";
import { RoleManager } from "./manager";

export const authOpts: SolidAuthConfig = {
    callbacks: {
        async signIn(params) {
            try {
                await RoleManager.assign(+params.user.id, "user");

                const isAllowedToSignIn = !void 0;
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (!isAllowedToSignIn) {
                    throw new Error("Unauthorized");
                }

                return true;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch ({ message }: any) {
                console.error("sign in callback", message);
                return false;
            }
        },
        session(params) {
            if (params.session.user) {
                params.session.user.id = +params.user.id;
            }

            return params.session;
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
