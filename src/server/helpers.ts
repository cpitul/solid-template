import { getSession } from "@auth/solid-start";
import { createServerData$ } from "solid-start/server";
import { authOpts } from "~/routes/api/auth/[...solidAuth]";

export function createSession() {
  return createServerData$(async (_, event) => {
    return await getSession(event.request, authOpts);
  });
}
