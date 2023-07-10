import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useAuth } from '../contexts/AuthContext';
import { CookieKey } from '../@types';
import nookies from 'nookies';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = nookies.get(context);

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

const Home: NextPage = () => {
    const { signOut } = useAuth();

    return (
        <div>
            <button onClick={signOut}>Log Out</button>
        </div>
    );
};

export default Home;
