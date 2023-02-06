/* eslint-disable import/extensions */
import { getSession } from "@auth/solid-start";
import { createRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { authOpts } from "~/routes/api/auth/[...solidauth]";

type UseSessionParams = { client?: true };
export function useSession(params?: UseSessionParams) {
  if (params?.client === true) return createRouteData(async (_, event) => getSession(event.request, authOpts));
  return createServerData$(async (_, event) => getSession(event.request, authOpts));
}
