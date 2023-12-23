import { usePagination } from '@/hooks/usePagination';
import React, { FC, ReactNode } from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { match } from 'ts-pattern';
import { colors } from '@/styles/theme';

const GapBox = () => {
    return <div className="p-2">...</div>;
};

type PageBoxProps = {
    page: number;
    isSelected: boolean;
};
const PageBox: FC<PageBoxProps> = ({ page }) => {
    return (
        <div className="flex h-6 min-w-[2rem] items-center justify-center">
            {page}
        </div>
    );
};

type NavButtonProps = {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    isSelected?: boolean;
    label?: string;
};
const NavButton: FC<NavButtonProps> = ({
    children,
    onClick,
    disabled = false,
    isSelected = false,
    label = undefined,
}) => {
    return (
        <button
            aria-label={label}
            onClick={() => onClick()}
            className={match({ isSelected, disabled })
                .with(
                    { isSelected: true },
                    () =>
                        'flex items-center justify-between rounded-md bg-primary-verdant p-1 text-white dark:text-black',
                )
                .with(
                    { disabled: true },
                    () =>
                        'flex items-center justify-between rounded-md border-[1px] border-transparent p-1',
                )
                .otherwise(
                    () =>
                        'flex items-center justify-between rounded-md border-[1px] border-transparent p-1 hover:border-gray-100',
                )}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

type PaginationNavProps = {
    page: number;
    changePage: ReturnType<typeof usePagination>['changePage'];
    pagesIndexes: ReturnType<
        ReturnType<typeof usePagination>['getPagesIndexes']
    >['indexesArr'];
};

export const PaginationNav: FC<PaginationNavProps> = ({
    page,
    changePage,
    pagesIndexes,
}) => {
    const { theme } = useTheme();
    const isFirstPage = page === 1;
    const isLastPage = page === pagesIndexes[pagesIndexes.length - 1];

    return (
        <div
            aria-label="pagination-nav"
            className="flex justify-center gap-2 p-4"
        >
            <NavButton
                label="prev-page-nav-button"
                onClick={() => changePage('previous')}
                disabled={isFirstPage}
            >
                <ChevronLeftIcon
                    size={16}
                    fillColor={match({ isFirstPage, theme })
                        .with({ isFirstPage: true }, () => colors.gray[100])
                        .with({ theme: 'dark' }, () => 'white')
                        .otherwise(() => 'black')}
                />
                <div className={isFirstPage ? 'pr-2 text-gray-100' : 'pr-2'}>
                    Previous
                </div>
            </NavButton>
            <div className="flex gap-2 max-sm:hidden">
                {pagesIndexes.map((pageIndex) =>
                    pageIndex === null ? (
                        <GapBox key={pageIndex} />
                    ) : (
                        <NavButton
                            key={pageIndex}
                            onClick={() => changePage(pageIndex)}
                            isSelected={page === pageIndex}
                        >
                            <PageBox
                                page={pageIndex}
                                isSelected={page === pageIndex}
                            />
                        </NavButton>
                    ),
                )}
            </div>
            <NavButton
                label="next-page-nav-button"
                onClick={() => changePage('next')}
                disabled={isLastPage}
            >
                <div className={isLastPage ? 'pl-2 text-gray-200' : 'pl-2'}>
                    Next
                </div>
                <ChevronRightIcon
                    size={16}
                    fillColor={match({ isFirstPage, theme })
                        .with({ isFirstPage: true }, () => colors.gray[100])
                        .with({ theme: 'dark' }, () => 'white')
                        .otherwise(() => 'black')}
                />
            </NavButton>
        </div>
    );
};
