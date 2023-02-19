import { useNavigate } from "solid-start/router";
import { useSession } from "~/utils/auth";
import { Routes } from "~/utils/enums";

type PrivateRouteParams = { enabled?: boolean; redirect?: Routes; replace?: boolean };
/** i'd recommend using a middleware layer for this */
export function privateRoute(params?: PrivateRouteParams): void {
    if (!params?.enabled) return void 0;
    const sessionData = useSession();
    const navigate = useNavigate();

    if (!sessionData()?.user) {
        return navigate(params.redirect ?? Routes.SIGN_IN, {
            replace: params.replace === true,
            state: { cheeky: true },
        });
    }

    return void 0;
}
