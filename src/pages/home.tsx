import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const Home: NextPage = () => {
    const auth = useAuth();

    return (
        <div>
            <Link href="/">Log Out</Link>
        </div>
    );
};

export default Home;
