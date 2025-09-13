import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { type Config, type RouteName, route } from 'ziggy-js';
import type { Page } from '@inertiajs/core';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page: Page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
        setup: ({ App, props }) => {
            (global as any).route = <T extends RouteName>(
                name: T,
                params?: Parameters<typeof route>[1],
                absolute?: boolean
            ) =>
                route(name, params, absolute, {
                    ...(page.props.ziggy as Config),
                    location: new URL(page.props.ziggy.location),
                });
            return <App {...props} />;
        },
    }),
);
