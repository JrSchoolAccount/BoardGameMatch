import type { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { JWT } from 'next-auth/jwt';

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
    ],
    secret: NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/sign-in',
        signOut: '/sign-out',
    },
    callbacks: {
        async jwt({
            token,
            account,
            profile,
        }: {
            token: JWT;
            account: any;
            profile?: any;
        }) {
            if (account && profile) {
                token.userId = profile.id;
                token.userName = profile.login;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            if (session.user) {
                session.user.userId = token.userId;
                session.user.username = token.userName;
            }
            return session;
        },
    },
};
