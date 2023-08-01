import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { sessionIsActive } from '../useCases/auth';
import { UnauthorizedError } from '../errors';
import { handleServerErrorResponse } from '../middlewares/handleServerErrorResponse';

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        if (!sessionIsActive(context)) throw new UnauthorizedError({});

        return {
            props: {},
        };
    } catch (error) {
        return handleServerErrorResponse(error);
    }
};

const Profile: NextPage = () => {
    const { signOut, user } = useAuth();

    return (
        <>
            <div>
                <Link href="/home">Home</Link>
                <button onClick={() => signOut}>Log Out</button>
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
