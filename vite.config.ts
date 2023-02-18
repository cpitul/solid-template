/* eslint-disable import/no-extraneous-dependencies */
import solid from "solid-start/vite";
import { defineConfig } from "vite";
import vercel from "solid-start-vercel";

export default defineConfig(() => ({
    plugins: [solid({ ssr: true, adapter: vercel({ edge: false }) })],
    ssr: { external: ["@prisma/client"] },
}));
