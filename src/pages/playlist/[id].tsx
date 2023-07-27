/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useAuth } from '../../contexts/AuthContext';
import { CookieKey, Playlist, QueryKey, UserProfile } from '../../@types';
import { parseCookies } from 'nookies';
import {
    getPlaylist,
    getUserProfiles,
    queryUsers,
    updatePlaylistAllowedUsers,
} from '../../services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = parseCookies(context);
    const { id } = context.query;

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const playlist = await getPlaylist(id as string, context).catch(() => null);

    if (!playlist) {
        return {
            notFound: true,
        };
    }

    const allowedUsers = await getUserProfiles(
        playlist?.allowed_userIds,
        context,
    );

    return { props: { playlist, allowedUsers } };
};

export type PlaylistProps = {
    playlist: Playlist;
    allowedUsers: UserProfile[];
};

const Playlist: NextPage<PlaylistProps> = ({ playlist, allowedUsers }) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    //USERSLIST
    const usersProfilesKey: QueryKey = 'users-profiles';
    const usersProfilesQuery = useQuery([usersProfilesKey], {
        queryFn: () => getUserProfiles(allowedUsers.map(({ id }) => id)),
        initialData: allowedUsers,
        keepPreviousData: true,
    });
    const usersProfilesMutation = useMutation({
        mutationFn: async (userIds: string[]) => {
            if (!playlist) return;
            return updatePlaylistAllowedUsers(playlist.id, userIds);
        },
        onSuccess: () => {
            queryClient.invalidateQueries([usersProfilesKey]);
        },
    });
    const [users, setUsers] = useState<
        {
            id: string;
            name: string;
            imageURL: string;
            status?: 'removed' | 'added';
        }[]
    >([]);

    const addRemoveNewAllowedUser = (
        user: Omit<typeof users[number], 'status'>,
    ) => {
        setUsers((state) => {
            const newState = [...state];
            const usersIds = state.map(({ id }) => id);
            const idPosition = usersIds.findIndex((id) => id === user.id);

            if (idPosition === -1)
                return Array.from(
                    new Set([
                        ...newState,
                        { ...user, status: 'added' as const },
                    ]),
                );

            newState.splice(idPosition, 1);

            return newState;
        });
    };

    //
    //USERSSARCHBOX
    const [userIdentifer, setUserIdentifier] = useState('');
    const usersQuery = useMutation({
        mutationFn: (identifier: typeof userIdentifer) => {
            return queryUsers(identifier);
        },
    });
    //

    useEffect(() => {
        if (!usersProfilesQuery.data || !user) return;
        const usersProfiles = usersProfilesQuery.data.map((userProfile) => {
            const { image_url, ...rest } = userProfile;

            return {
                ...rest,
                imageURL: image_url,
            };
        });
        setUsers(usersProfiles);
    }, [usersProfilesQuery.data, user]);

    return (
        <div>
            <div
                style={{
                    display: 'inline-block',
                    width: '50%',
                    position: 'fixed',
                    top: '0',
                }}
            >
                {playlist && (
                    <>
                        <div>
                            {usersProfilesQuery.isLoading
                                ? 'Loading'
                                : users.map((user) => {
                                      const { imageURL, name, id, status } =
                                          user;
                                      const usersIds = users.map(
                                          (user) => user.id,
                                      );
                                      return (
                                          <div
                                              key={user.id}
                                              style={{ border: 'solid white' }}
                                          >
                                              <img
                                                  src={
                                                      imageURL || '/notDefined'
                                                  }
                                                  alt="logo"
                                                  width="64"
                                                  height="64"
                                              />
                                              {`${id} | ${name}`}
                                              {status && (
                                                  <button
                                                      onClick={() =>
                                                          addRemoveNewAllowedUser(
                                                              {
                                                                  id,
                                                                  name,
                                                                  imageURL,
                                                              },
                                                          )
                                                      }
                                                  >
                                                      {usersIds.includes(id)
                                                          ? 'Remover'
                                                          : 'Adicionar'}
                                                  </button>
                                              )}
                                              {status &&
                                                  `${
                                                      status === 'added'
                                                          ? 'Adicionado'
                                                          : ''
                                                  }`}
                                          </div>
                                      );
                                  })}
                            <button
                                onClick={() =>
                                    usersProfilesMutation.mutate(
                                        users.map(({ id }) => id),
                                    )
                                }
                            >
                                Save
                            </button>
                        </div>
                        <div>
                            <input
                                onChange={(event) =>
                                    setUserIdentifier(event.target.value)
                                }
                            />
                            <button
                                onClick={() => usersQuery.mutate(userIdentifer)}
                            >
                                Search
                            </button>
                            {usersQuery.isLoading
                                ? 'Loading'
                                : usersQuery.data?.map((user) => {
                                      const { avatar, displayName, id } = user;
                                      const imageURL =
                                          avatar?.sources[0].url ||
                                          '/notDefined';
                                      const usersIds = users.map(
                                          (user) => user.id,
                                      );
                                      return (
                                          <div
                                              key={user.id}
                                              style={{
                                                  border: 'solid white',
                                                  backgroundColor:
                                                      usersIds.includes(id)
                                                          ? 'rgba(255, 0, 0, 0.3)'
                                                          : 'rgba(2, 0, 255, 0.3)',
                                              }}
                                          >
                                              <img
                                                  src={imageURL}
                                                  alt="logo"
                                                  width="64"
                                                  height="64"
                                              />
                                              {`${id} | ${displayName}`}
                                              <button
                                                  onClick={() =>
                                                      addRemoveNewAllowedUser({
                                                          id,
                                                          name: displayName,
                                                          imageURL,
                                                      })
                                                  }
                                              >
                                                  {usersIds.includes(id)
                                                      ? 'Remover'
                                                      : 'Adicionar'}
                                              </button>
                                          </div>
                                      );
                                  })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Playlist;
