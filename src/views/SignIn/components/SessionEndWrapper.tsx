import React, { FC, ReactNode, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { useCookies } from '@/contexts/CookiesContext';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';

type SessionEndWrapperProps = {
    children: ReactNode;
};

export const SessionEndWrapper: FC<SessionEndWrapperProps> = ({ children }) => {
    const { deleteCookie } = useCookies();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const sessionEnd = searchParams?.get('sessionEnd') || null;
    const { toast } = useToast();

    useEffect(() => {
        if (!!sessionEnd) {
            deleteCookie(TOKEN_COOKIE_KEY);
            toast(
                'Youre session was expired. Please sign in to continue',
                'error',
            );
            if (pathname) router.push(pathname);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, sessionEnd, pathname]);

    return <>{children}</>;
};
