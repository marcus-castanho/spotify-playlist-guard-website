import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

const Index: NextPage = () => {
    return (
        <>
            <Link href="/signin">Sign in</Link>
        </>
    );
};

export default Index;
