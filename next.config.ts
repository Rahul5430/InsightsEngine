import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: [
			'echarts',
			'echarts-for-react',
			'lucide-react',
		],
	},
	compiler: {
		// Remove console logs in production
		removeConsole: process.env.NODE_ENV === 'production',
	},
};

export default nextConfig;
