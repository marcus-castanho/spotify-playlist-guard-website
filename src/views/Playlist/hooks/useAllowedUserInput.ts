import { useState } from 'react';
import { z } from 'zod';

export function useAllowedUserInput() {
    const [userIdInput, setUserIdInput] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleUserIdInput = (userId: string) => {
        setIsValid(true);
        setUserIdInput(userId);
    };

    const validateAllowedUserInput = (userId: string) => {
        const userIdSchema = z.string().min(1);
        const validation = userIdSchema.safeParse(userId);

        setIsValid(validation.success);

        return {
            isValid: validation.success,
        };
    };

    const handleSubmit = (submitFn: () => void) => {
        const { isValid } = validateAllowedUserInput(userIdInput);

        if (!isValid) return;

        submitFn();
    };

    return {
        userIdInput,
        handleUserIdInput,
        validateAllowedUserInput,
        isValid,
        handleSubmit,
    };
}
