import { useEffect } from 'react';
import { emitBackgroundChange } from './events';
import { Theme } from '@/contexts/ThemeContext';

/**Update story's background on manual theme switch via ThemeSwitcher */
export function useStoryBackgroundUpdate(backgroundTheme: Theme) {
    const htmlElement = document.documentElement;

    const onHtmlThemeClassChange: MutationCallback = (mutations) => {
        const htmlClassMutation = mutations.find(({ type, attributeName }) => {
            return type === 'attributes' && attributeName === 'class';
        });

        if (!htmlClassMutation) return;

        const currentHtmlElement = htmlClassMutation.target as HTMLElement;

        const theme = currentHtmlElement.classList.contains('dark')
            ? 'dark'
            : 'light';

        if (theme !== backgroundTheme) {
            emitBackgroundChange(theme);
        }
    };

    useEffect(() => {
        const observer = new MutationObserver(onHtmlThemeClassChange);

        observer.observe(htmlElement, { attributes: true });

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [backgroundTheme]);
}
