import React, { FC, ImgHTMLAttributes } from 'react';

type CustomImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const CustomImage: FC<CustomImageProps> = (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
};
