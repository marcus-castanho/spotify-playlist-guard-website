/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { getUserProfiles } from '../services/api';
import { QueryKey } from '../@types';

export type UsersListProps = {
    usersIds: string[];
};
export const UsersList: FC<UsersListProps> = ({ usersIds }) => {
    const usersProfilesKey: QueryKey = 'users-profiles';
    const usersProfilesQuery = useQuery([usersProfilesKey, usersIds], {
        queryFn: () => getUserProfiles(usersIds),
    });

    return (
        <div>
            {usersProfilesQuery.isLoading
                ? 'Loading'
                : usersProfilesQuery.data?.map((user) => {
                      const { image_url, name, id } = user;
                      return (
                          <div key={user.id} style={{ border: 'solid white' }}>
                              <img
                                  src={image_url || '/notDefined'}
                                  alt="logo"
                                  width="64"
                                  height="64"
                              />
                              {`${id} | ${name}`}
                          </div>
                      );
                  })}
        </div>
    );
};
