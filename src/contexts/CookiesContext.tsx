import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from 'react';
import Cookies from 'js-cookie';
import {
    CookiesOptions,
    getCookie,
    getCookies,
    setCookie,
    deleteCookie,
} from '@/storage/cookies/client';
import { CookieKey } from '@/storage/cookies';

type Cookies = {
    [key: string]: string;
};

export type CookiesContextType = {
    cookies: Cookies;
    getCookie: (key: CookieKey) => string | undefined;
    setCookie: (
        key: CookieKey,
        value: string,
        options?: CookiesOptions,
    ) => void;
    deleteCookie: (key: CookieKey) => void;
};

export type CookiesProviderProps = {
    children?: ReactNode;
};

const CookiesContext = createContext<CookiesContextType | null>(null);

export function CookiesProvider({ children }: CookiesProviderProps) {
    const [cookies, setCookies] = useState(getCookies());

    const handleGetCookie: typeof getCookie = (key) => {
        const cookie = getCookie(key);
        return cookie;
    };

    const handleSetCookie: typeof setCookie = (key, value, options) => {
        setCookie(key, value, options);
        const parsedCookies = getCookies();
        setCookies(parsedCookies);
    };

    const handleDeleteCookie: typeof deleteCookie = (key) => {
        deleteCookie(key);
        const parsedCookies = getCookies();
        setCookies(parsedCookies);
    };

    useEffect(() => {
        const interval = window.setInterval(() => {
            const storagedCookies = getCookies();

            setCookies((state) => {
                const cookiesHaveChanged =
                    JSON.stringify(storagedCookies) !== JSON.stringify(state);

                if (cookiesHaveChanged) return storagedCookies;

                return state;
            });
        }, 250);
        return () => window.clearInterval(interval);
    }, []);

    return (
        <CookiesContext.Provider
            value={{
                cookies,
                getCookie: handleGetCookie,
                setCookie: handleSetCookie,
                deleteCookie: handleDeleteCookie,
            }}
        >
            {children}
        </CookiesContext.Provider>
    );
}

export function useCookies(): CookiesContextType {
    const context = useContext(CookiesContext);

    if (!context) throw new Error('CookiesContext was not provided');

    return context;
}
