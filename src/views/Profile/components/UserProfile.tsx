import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileVisualizer } from './ProfileVisualizer';
import { Avatar } from '@/components/Avatar';
import { Spinner } from '@/components/Spinner';

export const UserProfile = () => {
    const { user } = useAuth();

    return (
        <div className="p-3. top-1/2 max-w-xs">
            <div className="flex justify-center p-4">
                <Avatar src={user?.images[1]} size={120} />
            </div>
            {user ? (
                <ProfileVisualizer
                    defaultForm={{
                        name: user.display_name,
                        email: user.email,
                    }}
                />
            ) : (
                <div className="flex h-40 items-center justify-center">
                    <Spinner size="small" />
                </div>
            )}
        </div>
    );
};
