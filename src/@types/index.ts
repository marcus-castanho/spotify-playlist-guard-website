export type QueryKey = 'playlists' | 'users-query' | 'users-profiles';

export type SpotifyPlaylistGuardApiReturn<T = never> =
    | {
          success: true;
          status: number;
          data: [T] extends [never] ? undefined : T;
      }
    | {
          success: false;
          status: number;
          data?: null;
      };
