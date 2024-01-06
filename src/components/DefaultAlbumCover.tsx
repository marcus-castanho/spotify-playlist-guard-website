import React from 'react';
import { MusicalNoteIcon } from './icons/MusicalNoteIcon';
import { colors } from '@/styles/theme';

export const DefaultAlbumCover = () => {
    return (
        <div
            aria-label="default-album-cover"
            className="inline-block w-full border-2 border-black bg-gray-400 p-2"
        >
            <MusicalNoteIcon fillColor={colors.gray['100']} />
        </div>
    );
};
