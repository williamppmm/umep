import { withBotId } from 'botid/next/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default withBotId(nextConfig);
