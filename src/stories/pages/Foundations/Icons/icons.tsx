import React, { ReactNode } from 'react';
import { MoonIcon } from '@/components/icons/MoonIcon';
import { SunIcon } from '@/components/icons/SunIcon';

export const icons: { title: string; component: ReactNode }[] = [
    {
        title: 'moon',
        component: <MoonIcon size={24} key={MoonIcon.name} />,
    },
    {
        title: 'sun',
        component: <SunIcon size={24} key={MoonIcon.name} />,
    },
];
