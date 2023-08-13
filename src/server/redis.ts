import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { serverEnv } from "~/utils/env/server";

export const redis = new Redis({
    // @ts-expect-error - uncomment `upstashSchema` in `src/env/schema.ts`
    url: serverEnv.UPSTASH_REDIS_REST_URL,
    // @ts-expect-error - uncomment `upstashSchema` in `src/env/schema.ts`
    token: serverEnv.UPSTASH_REDIS_REST_TOKEN,
});

export const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(70, "10 s"),
});
