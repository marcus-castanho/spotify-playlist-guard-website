import React, {
    ReactNode,
    createContext,
    useEffect,
    useState,
    useContext,
} from 'react';
import { parseCookies } from 'nookies';
import { getUserInfo } from '../services/auth';
import { CookieKey } from '../@types';

export type User = {
    id: string;
};

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
};

export type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    const isAuthenticated = !!user;

    useEffect(() => {
        const cookieKey: CookieKey = 's-p-guard:token';
        const { [cookieKey]: token } = parseCookies();

        if (token) {
            getUserInfo(token).then((response) => {
                const { id } = response;
                setUser({ id });
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
