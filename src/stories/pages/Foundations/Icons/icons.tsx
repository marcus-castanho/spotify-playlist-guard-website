import React, { ReactNode } from 'react';
import { MoonIcon } from '@/components/icons/MoonIcon';

export const icons: { title: string; component: ReactNode }[] = [
    {
        title: 'moon',
        component: <MoonIcon size={24} key={MoonIcon.name} />,
    },
];
