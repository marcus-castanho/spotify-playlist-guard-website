import React, { FC, ReactNode, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';

type SessionStartWrapperProps = {
    children: ReactNode;
};

export const SessionStartWrapper: FC<SessionStartWrapperProps> = ({
    children,
}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const sessionStart = searchParams?.get('sessionStart') || null;
    const { toast } = useToast();

    useEffect(() => {
        if (!!sessionStart) {
            toast('Successfully signed in.', 'success');

            window.history.pushState({}, document.title, '/home');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionStart, pathname]);

    return <>{children}</>;
};
