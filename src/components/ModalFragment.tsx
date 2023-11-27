import React, { ReactNode, FC } from 'react';

export type ModalFragmentProps = {
    display: boolean;
    content: ReactNode;
    closeModal: () => void;
};

export const ModalFragment: FC<ModalFragmentProps> = ({
    display,
    content,
    closeModal,
}) => {
    if (!display) return <></>;
    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.5)',
                }}
            />
            <dialog
                open={display}
                style={{
                    top: '50%',
                    transform: 'translate(0%, -50%)',
                }}
            >
                <button onClick={() => closeModal()}>x</button>
                {content}
            </dialog>
        </>
    );
};
