import { type JSXElement } from "solid-js";
import { redirect } from "solid-start";
import { createHandler, renderAsync, StartServer } from "solid-start/entry-server";

// make as const
const PROTECTED_PATHS: string[] = [];

export default createHandler(
    (input) => {
        return async (event) => {
            if (PROTECTED_PATHS.includes(new URL(event.request.url).pathname)) {
                // const user = await getUser(event.request);
                const user = undefined;
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (!user) {
                    return redirect("/"); // a page for a non logged in user
                }
            }
            return input.forward(event);
        };
    },
    renderAsync((event): JSXElement => <StartServer event={event} />)
);
