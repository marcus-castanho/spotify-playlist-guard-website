import React, { FC, ReactNode } from 'react';

type ImageLoaderProps = {
    children: ReactNode;
    loaded: boolean;
    bgImageSrc: string;
};

export const ImageLoader: FC<ImageLoaderProps> = ({
    children,
    loaded,
    bgImageSrc,
}) => {
    return (
        <div
            className={
                !loaded
                    ? 'h-full w-full rounded-[50%] bg-cover bg-center blur-lg'
                    : 'h-full w-full rounded-[50%] bg-cover bg-center'
            }
            style={{
                backgroundImage: `url(${bgImageSrc})`,
            }}
        >
            <div
                className={
                    !loaded
                        ? 'h-full w-full opacity-0'
                        : 'h-full w-full opacity-100'
                }
            >
                {children}
            </div>
        </div>
    );
};
