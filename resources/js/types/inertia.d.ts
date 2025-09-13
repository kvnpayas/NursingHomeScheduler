import type { Config } from 'ziggy-js';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';

declare module '@inertiajs/core' {
    export interface PageProps extends InertiaPageProps {
        ziggy: Config & { location: string };
    }
}