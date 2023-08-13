import { z, type ZodFormattedError } from "zod";

// export const githubSchema = z.object({
//     GITHUB_ID: z.string().min(1),
//     GITHUB_SECRET: z.string().min(1),
// });

// export const upstashSchema = z.object({
//     UPSTASH_REDIS_REST_URL: z.string().min(1),
//     UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
// });
//
export const databaseSchema = z.object({
    DATABASE_URL: z.string().min(1),
});

export const authSchema = z.object({
    AUTH_URL: z.string().url(),
    AUTH_SECRET: z.string().min(1),
    AUTH_TRUST_HOST: z.coerce.boolean().optional(),
});

export const serverScheme = z
    .object({
        NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    })
    // .merge(githubSchema)
    // .merge(upstashSchema)
    .merge(databaseSchema)
    .merge(authSchema);

export type ServerScheme = z.infer<typeof serverScheme>;

export const clientScheme = z.object({});

export type ClientScheme = z.infer<typeof clientScheme>;

export const formatErrors = (errors: ZodFormattedError<Map<string, string>>) => {
    return Object.entries(errors)
        .map(([name, value]) => {
            if ("_errors" in value) return `${name}: ${value._errors.join(", ")}\n`;
            return "";
        })
        .filter(Boolean);
};
