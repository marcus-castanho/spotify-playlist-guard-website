import React, { FC, ComponentProps } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

type Tooltip = ComponentProps<typeof Tippy>;

export const Tooltip: FC<Tooltip> = ({ children, ...props }) => {
    return <Tippy {...props}>{children}</Tippy>;
};
