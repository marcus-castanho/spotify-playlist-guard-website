import React, { ReactNode } from 'react';
import { MoonIcon } from '@/components/icons/MoonIcon';
import { SunIcon } from '@/components/icons/SunIcon';
import { GuardIcon } from '@/components/icons/GuardIcon';
import { DefaultAvatarIcon } from '@/components/icons/DefaultAvatarIcon';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { EyeIcon } from '@/components/icons/EyeIcon';

export const icons: { title: string; component: ReactNode }[] = [
    {
        title: 'moon',
        component: <MoonIcon size={24} key={MoonIcon.name} />,
    },
    {
        title: 'sun',
        component: <SunIcon size={24} key={MoonIcon.name} />,
    },
    {
        title: 'guard',
        component: <GuardIcon size={24} key={GuardIcon.name} />,
    },
    {
        title: 'default-avatar',
        component: <DefaultAvatarIcon size={24} key={DefaultAvatarIcon.name} />,
    },
    {
        title: 'arrow-left',
        component: <ArrowLeftIcon size={24} key={ArrowLeftIcon.name} />,
    },
    {
        title: 'eye',
        component: <EyeIcon size={24} key={EyeIcon.name} />,
    },
];
