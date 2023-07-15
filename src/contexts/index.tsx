import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { QueryProvider } from './QueryContext';
import { ThemeProvider } from './ThemeContext';

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
            {components.reduce((acc, Context) => {
                return <Context>{acc}</Context>;
            }, children)}
        </>
    );
}

export type AppContextProviderProps = { children: ReactNode };

export function AppContextProvider({ children }: AppContextProviderProps) {
    return (
        <ComposedContexts
            components={[AuthProvider, QueryProvider, ThemeProvider]}
        >
            {children}
        </ComposedContexts>
    );
}
