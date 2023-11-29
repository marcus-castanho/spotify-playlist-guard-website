import { shadows, Shadow } from '@/styles/theme';
import React, { FC } from 'react';

type ShadowedBoxProps = {
    shadow: Shadow;
    value: (typeof shadows)[Shadow];
};

export const ShadowedBox: FC<ShadowedBoxProps> = ({ shadow, value }) => {
    return (
        <div style={{}}>
            <div
                style={{
                    width: ' calc(7.5rem + 1.25vw)',
                    height: 'calc(7.5rem + 1.25vw)',
                    marginRight: ' 0.125rem',
                    borderRadius: ' 0.25rem',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'black',
                    boxShadow: value,
                }}
            >
                {shadow}
            </div>
        </div>
    );
};

export const BoxesList: FC = () => {
    return (
        <div
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
            <div
                className="grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
                style={{
                    padding: '1.5rem',
                    display: 'grid',
                    gridGap: '16px',
                }}
            >
                {Object.keys(shadows).map((shadowKey) => {
                    const shadow = shadowKey as Shadow;
                    const value = shadows[shadow];

                    return (
                        <ShadowedBox
                            key={shadow}
                            shadow={shadow}
                            value={value}
                        />
                    );
                })}
            </div>
        </div>
    );
};
