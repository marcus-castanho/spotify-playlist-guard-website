import React, { ComponentType, ReactNode, PropsWithChildren } from 'react';
import { AuthProvider } from './AuthContext';
import { QueryProvider } from './QueryContext';
import { ThemeProvider } from './ThemeContext';
import { ToastProvider } from './ToastContext';
import { ModalProvider } from './ModalContext';

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

export type AppContextProviderProps = { children: ReactNode };

export function AppContextProvider({ children }: AppContextProviderProps) {
    return (
        <ComposedContexts
            components={[
                QueryProvider,
                AuthProvider,
                ThemeProvider,
                ToastProvider,
                ModalProvider,
            ]}
        >
            {children}
        </ComposedContexts>
    );
}
