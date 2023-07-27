import { z } from 'zod';
import {
    playlistsSchema,
    queryUserSchema,
    userSchema,
    usersProfilesSchema,
} from '../services/api';

export type CookieKey = 's-p-guard:token';

export type QueryKey = 'playlists' | 'users-query' | 'users-profiles';

export type User = z.infer<typeof userSchema>;

export type Playlist = z.infer<typeof playlistsSchema>[number];

export type QueryUser = z.infer<typeof queryUserSchema>[number];

export type UserProfile = z.infer<typeof usersProfilesSchema>[number];
