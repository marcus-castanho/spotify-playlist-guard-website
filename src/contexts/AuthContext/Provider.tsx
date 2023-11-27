import React, {
    ComponentProps,
    ReactNode,
    createContext,
    useContext,
} from 'react';
import { User } from '@/services/spotifyPlaylistGuardApi';
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/storage/cookies/client';
import { useUserMe } from './hooks/useUserMe';
import { TOKEN_COOKIE_KEY } from '.';

export type AuthContextType = {
    user: User | null;
    refetchUser: () => void;
    isAuthenticated: boolean;
    signOut: (sessionEnd?: boolean) => void;
};

export type AuthProviderProps = {
    children?: ReactNode;
    defaultUser?: User | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, defaultUser }: AuthProviderProps) {
    const {
        me: user,
        refetch,
        invalidate,
    } = useUserMe({ signOut, defaultUser });
    const router = useRouter();
    const isAuthenticated = !!user;

    function signOut(sessionEnd?: boolean) {
        invalidate();
        deleteCookie(TOKEN_COOKIE_KEY);

        if (sessionEnd) return router.push(`/signin/?sessionEnd=${true}`);

        router.push('/signin');
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                refetchUser: () => refetch(),
                isAuthenticated,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error('AuthContext was not provided');

    return context;
}

export function withDefaultUser(
    Component: typeof AuthProvider,
    { defaultUser }: ComponentProps<typeof AuthProvider>,
) {
    const ComponentWrapper = ({ children }: { children?: ReactNode }) => {
        return <Component defaultUser={defaultUser}>{children}</Component>;
    };

    return ComponentWrapper;
}
