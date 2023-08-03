import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { QueryProvider } from './QueryContext';
import { ThemeProvider } from './ThemeContext';
import { ToastProvider } from './ToastContext';
import { ModalProvider } from './ModalContext';

type ComposedContextsProps = {
    components: Array<
        React.JSXElementConstructor<React.PropsWithChildren<unknown>>
    >;
    children: React.ReactNode;
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
