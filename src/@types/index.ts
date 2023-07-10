import { z } from 'zod';
import { userSchema } from '../services/api';

export type CookieKey = 's-p-guard:token';

export type User = z.infer<typeof userSchema>;
