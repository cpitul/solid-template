// @refresh reload
import { Suspense, type JSXElement } from "solid-js";
import { Body, ErrorBoundary, FileRoutes, Head, Html, Link, Meta, Route, Routes, Scripts, Title } from "solid-start";
import NotFound from "./components/NotFound";
import "./root.css";

export default function Root(): JSXElement {
    return (
        <Html lang="en">
            <Head>
                <Title>Solid Template</Title>
                <Meta charset="utf-8" />
                <Meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta name="theme-color" content="#026d56" />
                <Meta name="description" content="Template" />
                <Link rel="icon" href="/favicon.ico" />
            </Head>
            <Body>
                <Suspense>
                    <ErrorBoundary>
                        <Routes>
                            <FileRoutes />
                            <Route path="*" component={NotFound} />
                        </Routes>
                    </ErrorBoundary>
                </Suspense>
                <Scripts />
            </Body>
        </Html>
    );
}
