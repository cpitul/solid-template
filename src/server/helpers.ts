/* eslint-disable import/extensions */
import { useNavigate } from "solid-start/router";
import { getSession } from "@auth/solid-start";
import { createServerData$ } from "solid-start/server";
import { authOpts } from "~/routes/api/auth/[...solidauth]";
import { Routes } from "~/utils/enums";

export function useSession() {
    return createServerData$(async (_, event) => getSession(event.request, authOpts), { key: () => ["auth_user"] });
}

type LoginProtecParams = { redirect?: Routes };
/* i'd recommend using a middleware layer for this */
export function loginProtec(params?: LoginProtecParams): void {
    const sessionData = useSession();
    const navigate = useNavigate();

    if (!sessionData()?.user) {
        return navigate(params?.redirect ?? Routes.SIGN_IN, { replace: true, state: { cheeky: true } });
    }

    return void 0;
}
