import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { getUserProfiles } from '../services/spotifyPlaylistGuardApi';
import Image from 'next/image';
import { useClientErrorHandler } from '../errors/clientErrorHandlers';
import { QueryKey } from '../contexts/QueryContext';
import { getCookie } from '@/storage/cookies/client';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';

export type UsersListProps = {
    usersIds: string[];
};
export const UsersList: FC<UsersListProps> = ({ usersIds }) => {
    const { handleGuardApiResponse } = useClientErrorHandler();
    const usersProfilesKey: QueryKey = 'users-profiles';
    const authToken = getCookie(TOKEN_COOKIE_KEY) || '';
    const usersProfilesQuery = useQuery([usersProfilesKey, usersIds], {
        queryFn: () =>
            getUserProfiles({ usersIds, authToken })
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
