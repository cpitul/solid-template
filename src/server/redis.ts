import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { serverEnv } from "~/env/server";

export const redis = new Redis({
    url: serverEnv.UPSTASH_REDIS_REST_URL ?? "",
    token: serverEnv.UPSTASH_REDIS_REST_TOKEN ?? "",
});

export const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(70, "10 s"),
});
