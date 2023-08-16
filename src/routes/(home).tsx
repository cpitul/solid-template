import { Suspense, type JSXElement } from "solid-js";
import { A } from "solid-start";
import { helloQuery } from "~/server/api/query";
import { useSession$ } from "~/utils/auth";

export default function Home(): JSXElement {
    const hello = helloQuery({ name: "world!" });

    return (
        <main class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#9d679c] to-[#aeb2e7]">
            <div class="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 class="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">KIPRI</h1>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
                    <A
                        class="flex max-w-xs flex-col gap-4 border border-[#ff9f1c] rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                        href="https://start.solidjs.com"
                        target="_blank"
                    >
                        <h3 class="text-2xl font-bold"> Solid Start → </h3>
                        <div class="text-lg">Learn more about Solid Start and the basics.</div>
                    </A>
                    <A
                        class="flex max-w-xs flex-col gap-4 border border-[#ff9f1c] rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                        href="https://github.com/orjdev/create-jd-app"
                        target="_blank"
                    >
                        <h3 class="text-2xl font-bold">JD End →</h3>
                        <div class="text-lg">
                            Learn more about Create JD App, the libraries it uses, and how to deploy it
                        </div>
                    </A>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <p class="text-2xl text-white">{hello.data}</p>
                    <Suspense fallback={<p>Loading...</p>}>
                        <AuthShowcase />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

function AuthShowcase(): JSXElement {
    const session = useSession$();

    return (
        <div class="flex flex-col items-center justify-center gap-4">
            <p class="text-center text-2xl text-white">
                {session() && <span>Logged in as {session()?.user?.name} </span>}
            </p>
            <button class="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 active:scale-[.98]">
                {session() ? "boop" : "noboop"}
            </button>
        </div>
    );
}
