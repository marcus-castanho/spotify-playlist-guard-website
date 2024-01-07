import React from 'react';
import Image from 'next/image';
import { RedirectToSignInButton } from './RedirectToSignInButton';

export const Hero = () => {
    return (
        <div className="flex h-full rounded-lg dark:bg-gray-950">
            <div className="flex h-full w-[50%] flex-col items-center justify-center gap-8 p-16">
                <div className="flex flex-col gap-4">
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
            <div className="flex h-full w-[50%] flex-col items-center justify-center gap-8 p-16">
                <div className="relative rounded-md bg-black p-3">
                    <Image
                        alt="playlist-spotify-display"
                        src="/assets/images/playlist-spotify-display.png"
                        width={600}
                        height={0}
                        className="rounded-lg"
                        unoptimized
                    />
                    <div className="absolute bottom-0 left-0 h-[105px] w-[105px] translate-x-[-50%] translate-y-[50%] ">
                        <div className="h-full w-full animate-spin rounded-[50%] bg-gradient-to-b from-primary-verdant to-black" />
                    </div>
                    <Image
                        alt="playlist-spotify-display"
                        src="/assets/images/guardBot-191414-circle.png"
                        width={100}
                        height={0}
                        className="absolute bottom-0 left-0 translate-x-[-50%] translate-y-[50%] rounded-[50%]"
                        unoptimized
                    />
                </div>
            </div>
        </div>
    );
};
