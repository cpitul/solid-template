import {
    type DefaultSession,
    type DefaultUser,
    type Account as DefaultAccount,
    type Profile as DefaultProfile,
} from "@auth/core/types";

declare module "@auth/core/types" {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Session {
        user?: {
            id?: string;
        } & DefaultSession["user"];
    }

    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, prettier/prettier
    interface User extends DefaultUser { }

    /**
     * Usually contains information about the provider being used
     * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
     */
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, prettier/prettier
    interface Account extends DefaultAccount { }

    /** The OAuth profile returned from your provider */
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, prettier/prettier
    interface Profile extends DefaultProfile { }
}
