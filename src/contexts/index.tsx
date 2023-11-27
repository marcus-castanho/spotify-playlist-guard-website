import React, { ComponentType, ReactNode, PropsWithChildren } from 'react';
import { AuthProvider, withDefaultUser } from './AuthContext';
import { ModalProvider } from './ModalContext';
import { ToastProvider } from './ToastContext';
import { QueryProvider } from './QueryContext';
import { CookiesProvider } from './CookiesContext';
import { ThemeProvider } from './ThemeContext';

type ComposedContextsProps = {
    components: ComponentType<PropsWithChildren<unknown>>[];
    children: ReactNode;
};

function ComposedContexts(props: ComposedContextsProps) {
    const { components, children } = props;

    return (
        <>
            {components.reduceRight((acc, CurrContext) => {
                return <CurrContext>{acc}</CurrContext>;
            }, children)}
        </>
    );
}

export type AppContextProviderProps = {
    children: ReactNode;
    defaultUser?: Parameters<typeof withDefaultUser>[1]['defaultUser'];
    providers?: ComposedContextsProps['components'];
};

export function AppContextProvider({
    children,
    defaultUser,
    providers = [
        CookiesProvider,
        QueryProvider,
        withDefaultUser(AuthProvider, { defaultUser }),
        ThemeProvider,
        ToastProvider,
        ModalProvider,
    ],
}: AppContextProviderProps) {
    return (
        <ComposedContexts components={providers}>{children}</ComposedContexts>
    );
}
