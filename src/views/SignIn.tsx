import React, { FC, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { useCookies } from '@/contexts/CookiesContext';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';
import { PageContainer } from '@/components/PageContainer';
import { Header } from '@/components/Header';

type SignInProps = {
    authError?: string;
};

export const SignIn: FC<SignInProps> = ({ authError }) => {
    const { deleteCookie } = useCookies();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const sessionEnd = searchParams.get('sessionEnd');
    const { toast } = useToast();

    useEffect(() => {
        if (!!sessionEnd) {
            deleteCookie(TOKEN_COOKIE_KEY);
            toast(
                'Youre session was expired. Please sign in to continue',
                'error',
            );
        }
        if (!!(code || sessionEnd)) {
            router.push(pathname);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, code, sessionEnd]);

    return (
        <PageContainer>
            <Header />
            <button
                onClick={() =>
                    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`)
                }
            >
                Sign in with Spotify
            </button>
            {authError && <p>{authError}</p>}
        </PageContainer>
    );
};
