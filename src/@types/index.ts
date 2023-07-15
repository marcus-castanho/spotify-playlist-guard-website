import { z } from 'zod';
import { playlistSchema, userSchema } from '../services/api';

export type CookieKey = 's-p-guard:token';

export type User = z.infer<typeof userSchema>;

export type Playlist = z.infer<typeof playlistSchema>[number];
