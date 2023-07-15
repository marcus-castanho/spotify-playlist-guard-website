import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useAuth } from '../contexts/AuthContext';
import { CookieKey } from '../@types';
import nookies from 'nookies';
import Link from 'next/link';

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

const Profile: NextPage = () => {
    const { signOut, user } = useAuth();

    return (
        <>
            <div>
                <Link href="/home">Home</Link>
                <button onClick={signOut}>Log Out</button>
            </div>
            {user &&
                Object.keys(user).map((key) => {
                    return (
                        <div key={key}>{`${key}: ${
                            user[key as keyof typeof user]
                        }`}</div>
                    );
                })}
        </>
    );
};

export default Profile;
