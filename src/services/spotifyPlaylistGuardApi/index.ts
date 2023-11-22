export * from './routes';

export type ReturnValue<T = never> =
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
