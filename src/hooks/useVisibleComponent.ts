import { useState, useEffect, useRef } from 'react';

export function useVisibleComponent<T extends HTMLElement>(
    initialIsVisible: boolean,
) {
    const [isVisible, setIsVisible] = useState(initialIsVisible);
    const ref = useRef<T | null>(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return {
        ref,
        isVisible,
        switchVisibility: () => setIsVisible((state) => !state),
        setIsVisible: (value: boolean) => setIsVisible(value),
    };
}
