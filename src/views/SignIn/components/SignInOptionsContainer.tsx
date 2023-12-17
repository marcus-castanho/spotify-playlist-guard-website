import React from 'react';
import { useRouter } from 'next/navigation';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { SpotifyIcon } from '@/components/icons/SpotifyIcon';
import { ExternalLink } from '@/components/ExternalLink';

export const SignInOptionsContainer = () => {
    const router = useRouter();

    return (
        <div className="top-1/2 max-w-sm rounded-lg border-gray-100 bg-white p-5 dark:bg-black sm:border-[1px]">
            <div className="flex flex-col gap-6">
                <h1 className="flex justify-center px-4 text-4xl sm:py-4">
                    Sign in
                </h1>
                <ButtonPrimary
                    onClick={() =>
                        router.push(
                            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                        )
                    }
                >
                    <div className="flex justify-center gap-6">
                        Sign in with Spotify
                        <SpotifyIcon size={24} />
                    </div>
                </ButtonPrimary>
                <div className="border-t-[1px] border-gray-100">
                    <div className="flex flex-col items-center gap-2 px-4 py-4 sm:flex-row">
                        Does not a spotify account?
                        <ExternalLink
                            href="https://www.spotify.com/signup"
                            label="spotify-sign-up-linik"
                            target="_blank"
                            text="Sign up"
                        >
                            Sign up
                        </ExternalLink>
                    </div>
                </div>
            </div>
        </div>
    );
};
