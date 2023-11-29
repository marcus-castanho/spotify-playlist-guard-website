import React, { FC, ReactNode } from 'react';
import { Tooltip } from '@/components/Tooltip';
import { linkTo } from '@storybook/addon-links';

type IconsListProps = {
    icons: { title: string; component: ReactNode }[];
};

export const IconsList: FC<IconsListProps> = ({ icons }) => {
    return (
        <div style={{ paddingTop: '24px' }}>
            {icons.map((icon) => (
                <Tooltip
                    key={icon.title}
                    content={icon.title}
                    placement="bottom"
                >
                    <div
                        className="hover:cursor-pointer"
                        style={{
                            display: 'inline-block',
                            padding: '2px',
                        }}
                        onClick={linkTo(`Foundations/Icons/${icon.title}`)}
                    >
                        {icon.component}
                    </div>
                </Tooltip>
            ))}
        </div>
    );
};
