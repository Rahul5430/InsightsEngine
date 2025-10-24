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
	// Enable source maps for better debugging
	productionBrowserSourceMaps: true,
	// Add security headers
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin',
					},
					{
						key: 'Cross-Origin-Opener-Policy',
						value: 'same-origin',
					},
				],
			},
		];
	},
};

export default nextConfig;
