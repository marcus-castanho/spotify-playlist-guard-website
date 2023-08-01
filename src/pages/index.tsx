import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

const Index: NextPage = () => {
    return (
        <div>
            <Link href="/signin">Sign in</Link>
        </div>
    );
};

export default Index;
