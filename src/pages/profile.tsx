import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { handlePageReqErrorResponse } from '../errors/serverErrorHandlers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { validateSession } from '../middlewares/validateSession';

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const locale = context.locale || '';

        validateSession(context);

        return {
            props: {
                ...(await serverSideTranslations(locale)),
            },
        };
    } catch (error) {
        return handlePageReqErrorResponse(error);
    }
};

const Profile: NextPage = () => {
    const { signOut, user } = useAuth();

    return (
        <>
            <div>
                <Link href="/home">Home</Link>
                <button onClick={() => signOut()}>Log Out</button>
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
