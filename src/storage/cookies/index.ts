import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';
import { THEME_COOKIE_KEY } from '@/contexts/ThemeContext';

export type CookieKey = typeof TOKEN_COOKIE_KEY | typeof THEME_COOKIE_KEY;
