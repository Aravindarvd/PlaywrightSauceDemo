import { getEnv } from "../utils/env";

export type User = {
    username: string;
    password: string;
}

const password = getEnv('SAUCE_PASSWORD')

export const user = {
    standard: {username: 'standard_user', password},
    lockedOutUser: {username: 'locked_out_user', password},
    invalidPassword: {username: 'standard_user', password: 'sauce'},
    missingUsername: {username: '',password}
} satisfies Record<string, User>;

