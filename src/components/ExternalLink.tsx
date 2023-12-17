import React, { ComponentProps, FC } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { Anchor } from './Anchor';

type ExternalLinkProps = {
    text: string;
    href: ComponentProps<typeof Anchor>['href'];
    target: ComponentProps<typeof Anchor>['target'];
    label: ComponentProps<typeof Anchor>['label'];
};

export const ExternalLink: FC<ExternalLinkProps> = ({
    text,
    href,
    target,
    label,
}) => {
    const { theme } = useTheme();

    return (
        <Anchor text={text} href={href} target={target} label={label}>
            <ExternalLinkIcon
                size={22}
                fillColor={theme === 'dark' ? 'white' : 'black'}
            />
        </Anchor>
    );
};
