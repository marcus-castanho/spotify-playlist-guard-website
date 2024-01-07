import React from 'react';
import Image from 'next/image';
import { RedirectToSignInButton } from './RedirectToSignInButton';

export const Hero = () => {
    return (
        <div className="flex h-full rounded-lg max-sm:flex-col dark:bg-gray-950">
            <div className="flex h-full flex-col items-center justify-center gap-8 p-4 sm:w-[50%] sm:p-16">
                <div className="flex flex-col gap-4 text-center">
                    <h1 className="text-5xl font-semibold">
                        A bot to guard your collaborative playlists
                    </h1>
                    <p className="text-lg">
                        {`The guard bot scans all your active playlists for songs
            added by non allowed users. Add your friends and
            don't worry about spammers anymore.`}
                    </p>
                </div>
                <RedirectToSignInButton />
            </div>
            <div className="flex h-full flex-col items-center justify-center gap-8 p-4 sm:w-[50%] sm:p-16">
                <div className="relative rounded-md bg-black p-3">
                    <Image
                        alt="playlist-spotify-display"
                        src="/assets/images/playlist-spotify-display.png"
                        width={600}
                        height={0}
                        className="rounded-lg"
                        unoptimized
                    />
                    <div className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] sm:left-0">
                        <div className="relative h-[80px] w-[80px] sm:h-[105px] sm:w-[105px]">
                            <div className="absolute bottom-[50%] left-[50%] h-[105%] w-[105%] translate-x-[-50%] translate-y-[50%]">
                                <div className="h-full w-full animate-spin rounded-[50%] bg-gradient-to-b from-primary-verdant to-black" />
                            </div>
                            <div className="absolute bottom-[50%] left-[50%] h-full w-full translate-x-[-50%] translate-y-[50%]">
                                <Image
                                    alt="playlist-spotify-display"
                                    src="/assets/images/guardBot-191414-circle.png"
                                    fill
                                    className="rounded-[50%]"
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
