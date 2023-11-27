import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from 'react';
import { ModalFragment } from '../components/ModalFragment';
import { usePathname } from 'next/navigation';

export type ModalContextType = {
    openModal: (modalContent: ReactNode) => void;
    closeModal: () => void;
};

export type ModalProviderProps = {
    children?: ReactNode;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: ModalProviderProps) {
    const [display, setDisplay] = useState(false);
    const [content, setContent] = useState<ReactNode>(null);
    const pathname = usePathname();

    const openModal = (modalContent: ReactNode) => {
        setDisplay(true);
        setContent(modalContent);
    };

    const closeModal = () => {
        setDisplay(false);
        setContent(null);
    };

    useEffect(() => {
        if (display) document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [display]);

    useEffect(() => {
        closeModal();
    }, [pathname]);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            <ModalFragment
                display={display}
                content={content}
                closeModal={closeModal}
            />
            {children}
        </ModalContext.Provider>
    );
}

export function useModal(): ModalContextType {
    const context = useContext(ModalContext);

    if (!context) throw new Error('ModalContext was not provided');

    return context;
}
