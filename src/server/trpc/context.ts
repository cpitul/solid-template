import { getSession } from "@auth/solid-start";
import { type inferAsyncReturnType } from "@trpc/server";
import { type createSolidAPIHandlerContext } from "solid-start-trpc";
// eslint-disable-next-line import/extensions
import { authOpts } from "~/routes/api/auth/[...solidauth]";
import { prisma } from "~/server/db/client";

export const createContextInner = async (opts: createSolidAPIHandlerContext) => {
  const session = await getSession(opts.req, authOpts);
  return {
    ...opts,
    prisma,
    session,
  };
};

export const createContext = async (opts: createSolidAPIHandlerContext) => createContextInner(opts);

export type TRPCContext = inferAsyncReturnType<typeof createContext>;
