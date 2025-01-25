import type { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error(
        'GitHub Client ID and Secret not set in environment variables!'
    );
}

export const options: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Dummy Sign-In',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'Your username',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { username } = credentials || {};

                if (!username || username.trim() === '') {
                    throw new Error('Username is required');
                }

                return {
                    id: username,
                    name: username,
                    username: username,
                    email: `${username}@example.com`,
                    image: 'https://via.placeholder.com/150',
                };
            },
        }),
    ],
    secret: NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in',
        signOut: '/sign-out',
    },
};
