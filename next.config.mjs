/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['a0.muscache.com', 'glvmmupiqwlmhicmggqp.supabase.co', 'utfs.io', 'static.vecteezy.com'],
        remotePatterns: [
            {
                hostname: "a0.muscache.com",
                protocol: "https",
                port: "",
            },
            {
                hostname: "glvmmupiqwlmhicmggqp.supabase.co",
                protocol: "https",
                port: "",
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
            }, {
                protocol: 'https',
                hostname: 'static.vecteezy.com',
                port: '',
            }
        ],
    },
};

export default nextConfig;
