import { middleware$, error$ } from "@prpc/solid";
import { useSession$ } from "~/utils/auth";
// import { ratelimit } from "../redis";

// export const rateLimitMw = middleware$(async (params) => {
//     const ip = params.request$.headers.get("x-forwarded-for") ?? "127.0.0.1";
//     const { success, pending, reset } = await ratelimit.limit(`mw_${ip}`);
//     await pending;
//
//     if (!success) {
//         return error$(`Rate limit exceeded, retry in ${new Date(reset).getDate()} seconds`, { status: 429 });
//     }
//
//     return void 0;
// });

export const authMw = middleware$(() => {
    const session = useSession$();
    if (!session || !session.latest?.user) {
        return error$("You can't do that!");
    }

    return {
        session: {
            ...session.latest,
            user: session.latest.user,
        },
    };
});
