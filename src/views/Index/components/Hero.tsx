import React, { useState } from 'react';
import Image from 'next/image';
import { RedirectToSignInButton } from './RedirectToSignInButton';
import { ImageLoader } from '@/components/ImageLoader';

const GuardBotSign = () => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative h-60 w-60 sm:h-72 sm:w-72">
            <div className="absolute bottom-[50%] left-[50%] h-[102.5%] w-[102.5%] translate-x-[-50%] translate-y-[50%]">
                <div className="h-full w-full animate-spin rounded-[50%] bg-gradient-to-b from-primary-verdant to-black" />
            </div>
            <div className="absolute bottom-[50%] left-[50%] h-full w-full translate-x-[-50%] translate-y-[50%]">
                <ImageLoader
                    loaded={loaded}
                    bgImageSrc="assets/images/guardBot-191414-circle-resized_10x10.png"
                >
                    <Image
                        alt="playlist-spotify-display"
                        src="assets/images/guardBot-191414-circle.png"
                        fill
                        className={'rounded-[50%]'}
                        unoptimized
                        onLoad={() => setLoaded(true)}
                    />
                </ImageLoader>
            </div>
        </div>
    );
};

export const Hero = () => {
    return (
        <div className="flex h-full rounded-lg max-sm:flex-col-reverse dark:bg-black">
            <div className="flex h-full flex-col items-center justify-center gap-8 p-4 sm:w-[50%] sm:p-16">
                <div className="flex flex-col gap-4 text-center">
                    <h1 className="text-4xl font-semibold sm:text-5xl">
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
                <GuardBotSign />
            </div>
        </div>
    );
};
