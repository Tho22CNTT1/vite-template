import type { ReactNode } from 'react';

export interface RouteItem {
    path: string;
    label: string;
    key: string;
    icon?: ReactNode;
    element?: ReactNode;
    isShowMenu?: boolean;
    isPrivate?: boolean;
    roles?: string[];
    permissions?: string[];
}