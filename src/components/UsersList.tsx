import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { getUserProfiles } from '../services/spotifyPlaylistGuardApi';
import Image from 'next/image';
import { useClientErrorHandler } from '../errors/useClientErrorHandler';
import { QueryKey } from '../contexts/QueryContext';

export type UsersListProps = {
    usersIds: string[];
};
export const UsersList: FC<UsersListProps> = ({ usersIds }) => {
    const { handleGuardApiResponse } = useClientErrorHandler();
    const usersProfilesKey: QueryKey = 'users-profiles';
    const usersProfilesQuery = useQuery([usersProfilesKey, usersIds], {
        queryFn: () =>
            getUserProfiles(usersIds)
                .then(handleGuardApiResponse)
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
