/* eslint-disable @next/next/no-img-element */
import { useMutation } from '@tanstack/react-query';
import React, { FC, useState } from 'react';
import { queryUsers } from '../services/api';

export const UsersSearchBox: FC = () => {
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
                      return (
                          <div key={user.id} style={{ border: 'solid white' }}>
                              <img
                                  src={avatar?.sources[0].url || '/notDefined'}
                                  alt="logo"
                                  width="64"
                                  height="64"
                              />
                              {`${id} | ${displayName}`}
                          </div>
                      );
                  })}
        </div>
    );
};
