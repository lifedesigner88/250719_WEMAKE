export interface ForLoggedInUserContext {
    isLoggedIn: boolean;
    username?: string;
    avatar?: string | null;
    name?: string;
    profile_id?: string;
}
