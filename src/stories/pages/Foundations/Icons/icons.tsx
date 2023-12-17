import React, { ReactNode } from 'react';
import { MoonIcon } from '@/components/icons/MoonIcon';
import { SunIcon } from '@/components/icons/SunIcon';
import { GuardIcon } from '@/components/icons/GuardIcon';
import { DefaultAvatarIcon } from '@/components/icons/DefaultAvatarIcon';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { EyeIcon } from '@/components/icons/EyeIcon';
import { EyeSlashIcon } from '@/components/icons/EyeSlashIcon';
import { GitHubIcon } from '@/components/icons/GitHubIcon';
import { ExternalLinkIcon } from '@/components/icons/ExternalLinkIcon';
import { SpotifyIcon } from '@/components/icons/SpotifyIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';

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
    {
        title: 'eye-slash',
        component: <EyeSlashIcon size={24} key={EyeIcon.name} />,
    },
    {
        title: 'github',
        component: <GitHubIcon size={24} key={GitHubIcon.name} />,
    },
    {
        title: 'external-link',
        component: <ExternalLinkIcon size={24} key={ExternalLinkIcon.name} />,
    },
    {
        title: 'spotify',
        component: <SpotifyIcon size={24} key={SpotifyIcon.name} />,
    },
    {
        title: 'check',
        component: <CheckIcon size={24} key={CheckIcon.name} />,
    },
];
