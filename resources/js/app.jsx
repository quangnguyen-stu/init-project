import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import NProgress from "nprogress";
import { Inertia } from "@inertiajs/inertia";
import { InertiaProgress } from "@inertiajs/progress";

let timeout = null;

createInertiaApp({
    resolve: (name) =>
        import(`./Home/${name}`).then((module) => module.default),
    setup({ el, App, props }) {
        render(<App {...props} />, el);
    },
});

InertiaProgress.init({
    // The delay after which the progress bar will
    // appear during navigation, in milliseconds.
    delay: 250,

    // The color of the progress bar.
    color: "#95e",

    // Whether to include the default NProgress styles.
    includeCSS: true,

    // Whether the NProgress spinner will be shown.
    showSpinner: false,
});

Inertia.on("start", () => {
    timeout = setTimeout(() => NProgress.start(), 250);
});

Inertia.on("progress", (event) => {
    if (NProgress.isStarted() && event.detail.progress.percentage) {
        NProgress.set((event.detail.progress.percentage / 100) * 0.9);
    }
});

Inertia.on("finish", (event) => {
    clearTimeout(timeout);
    if (!NProgress.isStarted()) {
        return;
    } else if (event.detail.visit.completed) {
        NProgress.done();
    } else if (event.detail.visit.interrupted) {
        NProgress.set(0);
    } else if (event.detail.visit.cancelled) {
        NProgress.done();
        NProgress.remove();
    }
});
