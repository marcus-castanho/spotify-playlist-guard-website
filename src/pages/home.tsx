import React from 'react';
import { NextPage } from 'next';
import { useAuth } from '../contexts/AuthContext';

const Home: NextPage = () => {
    const { signOut } = useAuth();

    return (
        <div>
            <button onClick={signOut}>Log Out</button>
        </div>
    );
};

export default Home;
