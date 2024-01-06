import React, { FC } from 'react';

type MusicalNoteIconProps = {
    size?: number;
    fillColor?: string;
};

export const MusicalNoteIcon: FC<MusicalNoteIconProps> = ({
    size = undefined,
    fillColor = 'black',
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <title>musical-note-icon</title>
            <path
                d="M104.83 8.35l-67.47 9.81a3.228 3.228 0 0 0-2.76 3.19v68.19c-5.33-.63-11.21 2.79-14.63 6.38c-6.43 6.75-7.55 16.14-2.48 20.97c5.06 4.83 14.39 3.26 20.82-3.49c2.75-2.89 5.31-7.72 5.71-12.34h.07V41.65l54.28-7.89v48.02c-5.37-.73-11.34 2.72-14.8 6.36c-6.43 6.75-7.54 16.14-2.48 20.97c5.07 4.83 14.39 3.26 20.82-3.49c2.84-2.98 5.49-8.04 5.76-12.8h.02v-82c0-1.53-1.35-2.69-2.86-2.47z"
                fill={fillColor}
            ></path>
        </svg>
    );
};
