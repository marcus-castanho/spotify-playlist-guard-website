import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Toast } from '../components/Toast';

export type ToastType = 'success' | 'warning' | 'info' | 'error';

export type ToastContextType = {
    toast(message: string, type?: ToastType): void;
    closeToast(): void;
};

export type ToastProviderProps = {
    children?: ReactNode;
};

const ToastContext = createContext({} as ToastContextType);

export function ToastProvider({ children }: ToastProviderProps) {
    const [display, setDisplay] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<ToastType>('info');

    const toast = (toastMessage: string, toastType: typeof type = 'info') => {
        setDisplay(true);
        setType(toastType);
        setMessage(toastMessage);

        setTimeout(() => {
            setDisplay(false);
        }, 3000);
    };

    const closeToast = () => setDisplay(false);

    return (
        <ToastContext.Provider value={{ toast, closeToast }}>
            <Toast display={display} message={message} type={type} />
            {children}
        </ToastContext.Provider>
    );
}

export function useToast(): ToastContextType {
    const context = useContext(ToastContext);
    const contextIsProvided = Object.keys(context).length > 0;

    if (!contextIsProvided) throw new Error('ToastContext was not provided');

    return context;
}
