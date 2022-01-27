import React, { useEffect } from "react";
import { Link } from "@inertiajs/inertia-react";
import { InertiaLink } from '@inertiajs/inertia-react'


export default function Layout({ children }) {
    return (
        <main>
            <header>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link component={InertiaLink}
                      href={route('logout')}>Log out</Link>
            </header>
            <article>{children}</article>
        </main>
    );
}
