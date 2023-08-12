import { type Session } from "@auth/core/types";
import { getSession } from "@auth/solid-start";
import { Show, type Component } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { authOpts } from "~/utils/auth";
import { Routes } from "~/entry-server";

function routeData() {
    return createServerData$(
        async (_, event) => {
            const session = await getSession(event.request, authOpts);
            if (!session?.user) {
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw redirect(Routes.HOME);
            }
            return session;
        },
        { key: () => ["auth_user"] }
    );
}

export default function Protected(Component: Component<{ session: Session }>) {
    return {
        routeData,
        Page: () => {
            const session = useRouteData<typeof routeData>();
            return (
                <Show when={session()} keyed>
                    {(s) => <Component session={s} />}
                </Show>
            );
        },
    };
}
