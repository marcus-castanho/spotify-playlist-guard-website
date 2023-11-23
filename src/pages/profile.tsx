import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { handlePageReqErrorResponse } from '../errors/serverErrorHandlers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Profile as ProfilePage } from '@/views/Profile';

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const locale = context.locale || '';

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
    return <ProfilePage />;
};

export default Profile;
