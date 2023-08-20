import React, {
    ReactNode,
    createContext,
    useEffect,
    useState,
    useContext,
} from 'react';
import { User, getUserInfo } from '../services/spotifyPlaylistGuardApi';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie } from '../storage/cookies';

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    signOut: (sessionEnd?: boolean) => void;
};

export type AuthProviderProps = {
    children?: ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const isAuthenticated = !!user;
    const token = getCookie('s-p-guard:token');

    const signOut = async (sessionEnd?: boolean) => {
        deleteCookie('s-p-guard:token');

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
                deleteCookie('s-p-guard:token');
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

    if (!context) throw new Error('AuthContext was not provided');

    return context;
}
