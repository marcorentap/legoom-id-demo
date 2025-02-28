import { Settings, User } from './app';

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    user: User;
    settings: Settings;
};
