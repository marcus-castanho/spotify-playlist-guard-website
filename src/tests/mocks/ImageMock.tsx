import React, { FC } from 'react';
import Image from 'next/image';

type NextImageMockProps = {
    altText: string;
};
export const NextImageMock: FC<NextImageMockProps> = ({ altText }) => {
    return (
        <Image
            alt={altText}
            src="/assets/images/guardBot-191414-circle.png"
            fill
        />
    );
};
