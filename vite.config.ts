/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/no-extraneous-dependencies */
import solid from "solid-start/vite";
import { defineConfig } from "vite";
// @ts-expect-error no typing
import vercel from "solid-start-vercel";

export default defineConfig(() => ({
  plugins: [solid({ ssr: true, adapter: vercel({ edge: false }) })],
  ssr: { external: ["@prisma/client"] },
}));
