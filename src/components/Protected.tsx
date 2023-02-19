import { type Session } from "@auth/core/types";
import { type Component, Show } from "solid-js";
import { useRouteData } from "solid-start";
import { redirect } from "solid-start/server";
import { useSession } from "~/utils/auth";
import { Routes } from "~/utils/enums";

type ProtectedComponent = Component<Session>;

export default function Protected(Comp: ProtectedComponent) {
    const routeData = () => {
        const session = useSession();
        if (!session()?.user) {
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw redirect(Routes.SIGN_IN);
        }

        return { session };
    };

    return {
        routeData,
        Page: () => {
            const data = useRouteData<typeof routeData>();

            return (
                <Show when={data.session()} keyed>
                    {(sess) => <Comp {...sess} />}
                </Show>
            );
        },
    };
}
