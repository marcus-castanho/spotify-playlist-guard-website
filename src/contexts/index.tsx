import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { QueryProvider } from './QueryContext';
import { ThemeProvider } from './ThemeContext';
import { ToastProvider } from './ToastContext';

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
                AuthProvider,
                QueryProvider,
                ThemeProvider,
                ToastProvider,
            ]}
        >
            {children}
        </ComposedContexts>
    );
}
