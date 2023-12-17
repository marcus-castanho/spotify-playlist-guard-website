import React, { ComponentProps, FC, ReactNode } from 'react';
import Link from 'next/link';

type AnchorProps = {
    children?: ReactNode;
    text: string;
    href: ComponentProps<typeof Link>['href'];
    target: ComponentProps<typeof Link>['target'];
    label: string;
};

export const Anchor: FC<AnchorProps> = ({
    children,
    text,
    href,
    target,
    label,
}) => {
    return (
        <Link
            href={href}
            target={target}
            className="flex hover:underline"
            aria-label={label}
        >
            {text}
            {children}
        </Link>
    );
};
