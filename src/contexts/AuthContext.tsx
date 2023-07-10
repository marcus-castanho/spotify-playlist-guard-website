import React, {
    ReactNode,
    createContext,
    useEffect,
    useState,
    useContext,
} from 'react';
import { destroyCookie, parseCookies } from 'nookies';
import { getUserInfo } from '../services/api';
import { CookieKey, User } from '../@types';
import { useRouter } from 'next/router';

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    signOut: () => void;
};

export type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const isAuthenticated = !!user;
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = parseCookies();

    const signOut = async () => {
        destroyCookie(null, tokenCookieKey);

        router.push('/');
    };

    useEffect(() => {
        if (!token) return;

        getUserInfo(token)
            .then((response) => {
                setUser(response);
            })
            .catch(() => {
                destroyCookie(null, tokenCookieKey);
                if (router.isReady) router.push('/');
            });
    }, [router, token]);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
