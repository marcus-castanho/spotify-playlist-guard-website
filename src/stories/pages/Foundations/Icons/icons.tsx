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
import { WarningFilledIcon } from '@/components/icons/WarningFilledIcon';
import { InfoIcon } from '@/components/icons/InfoIcon';
import { ErrorIcon } from '@/components/icons/ErrorIcon';
import { ServerWarningIcon } from '@/components/icons/ServerWarningIcon';
import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '@/components/icons/ChevronRightIcon';
import { PencilIcon } from '@/components/icons/PencilIcon';
import { CrossMarkIcon } from '@/components/icons/CrossMarkIcon';
import { MusicalNoteIcon } from '@/components/icons/MusicalNoteIcon';
import { ArrowRestoreIcon } from '@/components/icons/ArrowRestoreIcon';

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
    {
        title: 'warning-filled',
        component: <WarningFilledIcon size={24} key={WarningFilledIcon.name} />,
    },
    {
        title: 'info',
        component: <InfoIcon size={24} key={InfoIcon.name} />,
    },
    {
        title: 'error',
        component: <ErrorIcon size={24} key={ErrorIcon.name} />,
    },
    {
        title: 'server-warning',
        component: <ServerWarningIcon size={24} key={ServerWarningIcon.name} />,
    },
    {
        title: 'chevron-left',
        component: <ChevronLeftIcon size={24} key={ChevronLeftIcon.name} />,
    },
    {
        title: 'chevron-right',
        component: <ChevronRightIcon size={24} key={ChevronRightIcon.name} />,
    },
    {
        title: 'pencil',
        component: <PencilIcon size={24} key={PencilIcon.name} />,
    },
    {
        title: 'cross-mark',
        component: <CrossMarkIcon size={24} key={CrossMarkIcon.name} />,
    },
    {
        title: 'musical-note',
        component: <MusicalNoteIcon size={24} key={MusicalNoteIcon.name} />,
    },
    {
        title: 'arrow-restore',
        component: <ArrowRestoreIcon size={24} key={ArrowRestoreIcon.name} />,
    },
];
