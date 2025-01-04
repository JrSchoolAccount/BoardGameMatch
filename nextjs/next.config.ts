import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com', // Already configured
            },
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com', // Add this line
            },
        ],
    },
};

export default nextConfig;
