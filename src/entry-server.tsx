import { type JSXElement } from "solid-js";
import { createHandler, renderAsync, StartServer } from "solid-start/entry-server";

export default createHandler(renderAsync((event): JSXElement => <StartServer event={event} />));
