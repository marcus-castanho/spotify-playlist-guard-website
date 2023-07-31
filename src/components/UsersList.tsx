import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { getUserProfiles } from '../services/spotifyPlaylistGuardApi';
import { QueryKey } from '../@types';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';

export type UsersListProps = {
    usersIds: string[];
};
export const UsersList: FC<UsersListProps> = ({ usersIds }) => {
    const { signOut } = useAuth();
    const usersProfilesKey: QueryKey = 'users-profiles';
    const usersProfilesQuery = useQuery([usersProfilesKey, usersIds], {
        queryFn: () =>
            getUserProfiles(usersIds)
                .then(({ success, status, data }) => {
                    if (status === 401) return signOut(true);
                    if (!success) return [];

                    return data;
                })
                .catch(() => []),
    });

    return (
        <div>
            {usersProfilesQuery.isLoading
                ? 'Loading'
                : usersProfilesQuery.data?.map((user) => {
                      const { image_url, name, id } = user;
                      const imageSrc = image_url || '/notDefined';
                      return (
                          <div key={user.id} style={{ border: 'solid white' }}>
                              <Image
                                  src={imageSrc}
                                  alt="logo"
                                  width="64"
                                  height="64"
                                  loader={() => imageSrc}
                              />
                              {`${id} | ${name}`}
                          </div>
                      );
                  })}
        </div>
    );
};
