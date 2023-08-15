import { query$ } from "@prpc/solid";
import { z } from "zod";
import { authMw } from "./middleware";

export const helloQuery = query$({
    queryFn: ({ payload }) => {
        return `server says hello: ${payload.name}`;
    },
    key: "hello",
    schema: z.object({ name: z.string() }),
});

export const protectedQuery = query$({
    queryFn: ({ ctx$ }) => {
        return `protected -${ctx$.session.user.name}`;
    },
    key: "protected-1",
    middlewares: [authMw],
});

// export const rateLimitedQuery = query$({
//     queryFn: () => {
//         return "You are not limited, yay!";
//     },
//     key: "limited",
//     middlewares: [rateLimitMw],
// });
