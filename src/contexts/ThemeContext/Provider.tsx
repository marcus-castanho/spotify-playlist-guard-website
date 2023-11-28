import React, {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
} from 'react';
import { useCookies } from '../CookiesContext';
import { THEME_COOKIE_KEY } from '.';

export type Theme = 'dark' | 'light';

export type ThemeContextType = {
    switchTheme: (theme: Theme) => void;
    theme: Theme;
};

export type ThemeProviderProps = {
    children?: ReactNode;
    initialTheme: Theme;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
    const { getCookie, setCookie } = useCookies();
    const [theme, setTheme] = useState<Theme>(initialTheme);

    const getSystemPreferedColorSchema = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    };

    const updateDocumentThemeClass = () => {
        const systemPreferedColorSchema = getSystemPreferedColorSchema();
        const storagedTheme = getCookie(THEME_COOKIE_KEY) as Theme | undefined;

        if (
            storagedTheme === 'dark' ||
            (!storagedTheme && systemPreferedColorSchema === 'dark')
        ) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const switchTheme = (selectedTheme: 'dark' | 'light') => {
        setCookie(THEME_COOKIE_KEY, selectedTheme);
        setTheme(selectedTheme);
        updateDocumentThemeClass();
    };

    useEffect(() => {
        setCookie(THEME_COOKIE_KEY, theme);
        updateDocumentThemeClass();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ switchTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);

    if (!context) throw new Error('ThemeContext was not provided');

    return context;
}

export function withInitialTheme(
    Component: typeof ThemeProvider,
    { initialTheme }: { initialTheme: Theme },
) {
    const ComponentWrapper = ({ children }: { children?: ReactNode }) => {
        return <Component initialTheme={initialTheme}>{children}</Component>;
    };

    return ComponentWrapper;
}
