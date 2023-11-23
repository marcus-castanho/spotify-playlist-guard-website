import React, { FC } from 'react';
import Link from 'next/link';

export const Index: FC = () => {
    return (
        <>
            <Link href="/signin">Sign in</Link>
        </>
    );
};
