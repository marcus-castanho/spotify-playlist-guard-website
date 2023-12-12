import React, { FC, ReactNode } from 'react';
import { match } from 'ts-pattern';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { useTheme } from '@/contexts/ThemeContext';

type HeaderProps = {
    children: ReactNode;
};
const Header: FC<HeaderProps> = ({ children }) => {
    return <div className="border-b-[1px] border-gray-100 p-3">{children}</div>;
};

type ListItemProps = {
    children: ReactNode;
    border?: 'top' | 'bottom';
};
const ListItem: FC<ListItemProps> = ({ children, border }) => {
    return (
        <li
            className={match(border)
                .with('top', () => 'border-t-[1px] border-gray-100')
                .with('bottom', () => 'border-b-[1px] border-gray-100')
                .otherwise(() => '')}
        >
            <div className="flex w-full items-start rounded-[4px] p-3 hover:bg-gray-50 dark:hover:bg-gray-500">
                {children}
            </div>
        </li>
    );
};

type DropdownMenuListProps = {
    header?: ReactNode;
    itemsGroups: ReactNode[][];
    onClose: () => void;
};
export const DropdownMenuList: FC<DropdownMenuListProps> = ({
    header,
    itemsGroups,
    onClose,
}) => {
    const { theme } = useTheme();
    return (
        <div className="rounded-lg bg-white p-1 shadow-md dark:bg-gray-700  max-sm:h-full sm:w-[200px]">
            <Header>
                <button
                    aria-label="dropdown-menu-list-button"
                    onClick={() => onClose()}
                    className="pb-6 sm:hidden"
                >
                    <ArrowLeftIcon
                        size={24}
                        fillColor={theme === 'dark' ? 'white' : 'black'}
                    />
                </button>
                {header && <>{header}</>}
            </Header>
            <ul aria-label="dropdown-menu-list">
                {itemsGroups
                    .map((items, groupIndex) => {
                        const isLastGroup =
                            groupIndex === itemsGroups.length - 1;
                        const isSecondLastGroup =
                            groupIndex === itemsGroups.length - 2;
                        const isSingleGroup = itemsGroups.length === 1;

                        return items.map((item, itemIndex) => {
                            const isFirstItem = itemIndex === 0;
                            const isLastItem = itemIndex === items.length - 1;
                            const border = match({
                                isSingleGroup,
                                isLastGroup,
                                isFirstItem,
                                isLastItem,
                                isSecondLastGroup,
                            })
                                .with({ isSingleGroup: true }, () => undefined)
                                .with(
                                    { isSecondLastGroup: true },
                                    () => undefined,
                                )
                                .with(
                                    { isLastGroup: true, isFirstItem: true },
                                    () => 'top' as const,
                                )
                                .with(
                                    { isLastItem: true, isLastGroup: false },
                                    () => 'bottom' as const,
                                )
                                .otherwise(() => undefined);

                            return (
                                <ListItem
                                    key={`${groupIndex}-${itemIndex}`}
                                    border={border}
                                >
                                    {item}
                                </ListItem>
                            );
                        });
                    })
                    .flat()}
            </ul>
        </div>
    );
};
