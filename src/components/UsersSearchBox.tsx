import React, { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryUsers } from '../services/api';
import { AllowedUser } from '../hooks/useAllowedUsers';
import Image from 'next/image';

export type UsersSearchBoxProps = {
    allowedUsersIds: string[];
    addNewAllowedUser: ({
        id,
        name,
        imageURL,
    }: Omit<AllowedUser, 'status'>) => void;
};

export const UsersSearchBox: FC<UsersSearchBoxProps> = ({
    allowedUsersIds,
    addNewAllowedUser,
}) => {
    const [userIdentifer, setUserIdentifier] = useState('');
    const usersQuery = useMutation({
        mutationFn: (identifier: typeof userIdentifer) => {
            return queryUsers(identifier);
        },
    });

    return (
        <div>
            <input
                onChange={(event) => setUserIdentifier(event.target.value)}
            />
            <button onClick={() => usersQuery.mutate(userIdentifer)}>
                Search
            </button>
            {usersQuery.isLoading
                ? 'Loading'
                : usersQuery.data?.map((user) => {
                      const { avatar, displayName, id } = user;
                      const imageSrc = avatar?.sources[0].url || '/notDefined';

                      return (
                          <div
                              key={user.id}
                              style={{
                                  border: 'solid white',
                                  backgroundColor: allowedUsersIds.includes(id)
                                      ? 'rgba(255, 0, 0, 0.3)'
                                      : 'rgba(2, 0, 255, 0.3)',
                              }}
                          >
                              <Image
                                  src={imageSrc}
                                  alt="logo"
                                  width="64"
                                  height="64"
                                  loader={() => imageSrc}
                              />
                              {`${id} | ${displayName}`}
                              <button
                                  disabled={allowedUsersIds.includes(id)}
                                  onClick={() =>
                                      addNewAllowedUser({
                                          id,
                                          name: displayName,
                                          imageURL: imageSrc,
                                      })
                                  }
                              >
                                  Add
                              </button>
                          </div>
                      );
                  })}
        </div>
    );
};
