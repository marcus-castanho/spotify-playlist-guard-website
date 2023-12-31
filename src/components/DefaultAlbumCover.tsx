import React, { FC } from 'react';
import { MusicalNoteIcon } from './icons/MusicalNoteIcon';
import { colors } from '@/styles/theme';

type DefaultAlbumCoverProps = {
    size?: number;
};

export const DefaultAlbumCover: FC<DefaultAlbumCoverProps> = ({
    size = 140,
}) => {
    return (
        <div
            aria-label="default-album-cover"
            className="inline-block border-2 border-black bg-gray-400 p-2"
        >
            <MusicalNoteIcon size={size} fillColor={colors.gray['100']} />
        </div>
    );
};
