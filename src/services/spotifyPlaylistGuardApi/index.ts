export * from './routes';

export type ReturnValue<T = never> =
    | {
          success: true;
          status: number;
          data: [T] extends [never] ? null : T;
      }
    | {
          success: false;
          status: number;
          data?: null;
      };

export type Fetch<R, T = never> = [T] extends [never]
    ? () => Promise<ReturnValue<R>>
    : (payload: T) => Promise<ReturnValue<R>>;
