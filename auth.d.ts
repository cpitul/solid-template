import { type DefaultSession } from "@auth/core/types";

declare module "@auth/core/types" {
  // @ts-expect-error xD!
  export type Session = {
    user?: {
      id?: string;
    } & DefaultSession["user"];
  };
}
