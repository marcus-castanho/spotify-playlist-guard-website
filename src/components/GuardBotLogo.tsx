import React, { FC, ComponentProps } from 'react';
import { GuardIcon } from './icons/GuardIcon';

type GuardBotLogoProps = {
    size?: ComponentProps<typeof GuardIcon>['size'];
};
export const GuardBotLogo: FC<GuardBotLogoProps> = ({ size = 40 }) => {
    return (
        <div
            aria-label="guard-bot-logo"
            className="inline-block rounded-[2.5rem] border-2 border-black bg-white p-2 dark:border-white"
        >
            <GuardIcon size={size} fillColor="black" />
        </div>
    );
};
