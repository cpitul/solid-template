import { type JSXElement } from "solid-js";
import { redirect } from "solid-start";
import { createHandler, renderAsync, StartServer } from "solid-start/entry-server";
import { useSession } from "./utils/auth";
import { Routes } from "./utils/enums";

// make as const
const PROTECTED_PATHS: string[] = [];

export default createHandler(
    (input) => {
        return async (event) => {
            if (PROTECTED_PATHS.includes(new URL(event.request.url).pathname)) {
                const session = useSession();
                if (!session.latest?.user) {
                    return redirect(Routes.SIGN_IN);
                }
            }

            return input.forward(event);
        };
    },
    renderAsync((event): JSXElement => <StartServer event={event} />)
);
