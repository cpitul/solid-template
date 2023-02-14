/* eslint-disable import/extensions */
import { useNavigate } from "solid-start/router";
import { getSession } from "@auth/solid-start";
import { createRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { authOpts } from "~/routes/api/auth/[...solidauth]";
import { Routes } from "~/utils/enums";

type UseSessionParams = { client?: true };
export function useSession(params?: UseSessionParams) {
    if (params?.client === true)
        return createRouteData(async (_, event) => getSession(event.request, authOpts), { key: () => ["auth_user"] });
    return createServerData$(async (_, event) => getSession(event.request, authOpts), { key: () => ["auth_user"] });
}

type LoginProtecParams = { redirect?: Routes };
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
/* i'd recommend using a middleware layer for this */
export function loginProtec(params?: LoginProtecParams): void {
    const sessionData = useSession();
    const navigate = useNavigate();

    if (!sessionData()?.user) {
        return navigate(params?.redirect ?? Routes.SIGN_IN, { replace: true, state: { cheeky: true } });
    }

    return void 0;
}
