'use client';

import React from 'react';
import Link from 'next/link';
import { GitHubIcon } from './icons/GitHubIcon';
import { useTheme } from '@/contexts/ThemeContext';
import { ExternalLink } from './ExternalLink';

export const Footer = () => {
    const { theme } = useTheme();

    return (
        <footer className="flex justify-center gap-4 p-5">
            <Link
                href="https://github.com/marcus-castanho/spotify-playlist-guard-admin"
                target="_blank"
                aria-label="github-repository-link"
            >
                <GitHubIcon
                    size={24}
                    fillColor={theme === 'dark' ? 'white' : 'black'}
                />
            </Link>
            <div className="border-l-2 border-black dark:border-white" />
            <div className="flex gap-1">
                Developed by
                <ExternalLink
                    href="https://github.com/marcus-castanho"
                    label="github-profile-link"
                    target="_blank"
                    text="Marcus"
                />
            </div>
        </footer>
    );
};
