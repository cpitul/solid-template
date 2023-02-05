import { initTRPC, TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { serverEnv } from "~/env/server";
import type { TRPCContext } from "./context";

export const t = initTRPC.context<TRPCContext>().create();
export const { router } = t;

export const { procedure } = t;
export const protectedProcedure = procedure.use(
  t.middleware(async ({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to access this resource",
      });
    }

    return next({ ctx: { ...ctx, session: { ...ctx.session, user: ctx.session.user } } });
  })
);

const redis = new Redis({
  url: serverEnv.UPSTASH_REDIS_REST_URL ?? "",
  token: serverEnv.UPSTASH_REDIS_REST_TOKEN ?? "",
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(20, "10 s"),
});

const withRateLimit = t.middleware(async ({ ctx, next }) => {
  const ip = ctx.req.headers.get("x-forwarded-for") ?? "127.0.0.1";

  const { success, pending, limit, reset, remaining } = await ratelimit.limit(`mw_${ip}`);
  await pending;
  ctx.res.headers["X-RateLimit-Limit"] = limit.toString();
  ctx.res.headers["X-RateLimit-Remaining"] = remaining.toString();
  ctx.res.headers["X-RateLimit-Reset"] = reset.toString();
  if (!success) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: `Rate limit exceeded, retry in ${new Date(reset).getDate()} seconds`,
    });
  }
  return next({ ctx });
});

export const procedureWithLimiter = procedure.use(withRateLimit);
export const protectedProcedureWithLimiter = procedure.use(
  t.middleware(async ({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to access this resource",
      });
    }
    return next({ ctx: { ...ctx, session: { ...ctx.session, user: ctx.session.user } } });
  })
);
