import React, { ReactNode, FC } from 'react';
import { CrossMarkIcon } from './icons/CrossMarkIcon';
import { colors } from '@/styles/theme';
import { useTheme } from '@/contexts/ThemeContext';

type ModalFragmentProps = {
    display: boolean;
    content: ReactNode;
    closeModal: () => void;
};

export const ModalFragment: FC<ModalFragmentProps> = ({
    display,
    content,
    closeModal,
}) => {
    const { theme } = useTheme();

    if (!display) return <></>;
    return (
        <>
            <div className="fixed left-0 top-0 z-20 h-screen w-screen bg-black opacity-50" />
            <dialog
                aria-label="modal-dialog"
                open={display}
                className="fixed top-1/2 z-20 translate-y-[-50%] bg-transparent p-2 text-inherit"
            >
                <div className="rounded-lg border-[1px] bg-white dark:border-gray-100 dark:bg-black">
                    <div className="flex justify-end p-4">
                        <button
                            aria-label="close-modal-button"
                            onClick={() => closeModal()}
                        >
                            <CrossMarkIcon
                                size={14}
                                fillColor={
                                    theme === 'dark'
                                        ? colors.gray[50]
                                        : colors.gray[100]
                                }
                            />
                        </button>
                    </div>
                    {content}
                </div>
            </dialog>
        </>
    );
};
