export interface User {
    account: Account;
    profile: Profile;
    membership: Membership;
    role: string;
}

export interface Account {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: string;
}

export interface Profile {
    display_name: string;
    profile_picture: string;
    social_url: string;
}

export interface Membership {
    id: string;
    name: string;
}

export interface Settings {
    name: string;
    logo: string;
}

export interface Organization {
    logo: string;
    name: string;
}

export interface Application {
    id: string;
    name: string;
    secret: string;
    redirect: string;
}
