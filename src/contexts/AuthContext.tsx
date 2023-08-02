import React, {
    ReactNode,
    createContext,
    useEffect,
    useState,
    useContext,
} from 'react';
import { User, getUserInfo } from '../services/spotifyPlaylistGuardApi';
import { useRouter } from 'next/router';
import { cleanCookie, getCookie, CookieKey } from '../storage/cookies';

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    signOut: (sessionEnd?: boolean) => void;
};

export type AuthProviderProps = {
    children?: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const isAuthenticated = !!user;
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const token = getCookie(tokenCookieKey);

    const signOut = async (sessionEnd?: boolean) => {
        cleanCookie(tokenCookieKey);

        if (sessionEnd) return router.push(`/signin/?sessionEnd=${true}`);

        router.push('/signin');
    };

    useEffect(() => {
        if (!token) return;

        getUserInfo()
            .then(({ success, data }) => {
                if (!success) throw new Error('Unauthorized');
                return data;
            })
            .then((userInfo) => {
                setUser(userInfo);
            })
            .catch(() => {
                cleanCookie(tokenCookieKey);
                if (router.isReady) router.push(`/signin/?sessionEnd=${true}`);
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
    const contextIsProvided = Object.keys(context).length > 0;

    if (!contextIsProvided) throw new Error('AuthContext was not provided');

    return context;
}
