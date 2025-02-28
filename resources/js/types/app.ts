export interface User {
    account: Account;
    profile: Profile;
    membership: Membership;
}

export interface Account {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
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

export interface Organization {
    name: string;
    logo: string;
}
