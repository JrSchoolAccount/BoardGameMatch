import type {AuthOptions} from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('GitHub Client ID and Secret not set in environment variables!')
}

export const options: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        }),
    ],
    secret: NEXTAUTH_SECRET,
};