import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ['lucide-react'],
	},
	compiler: {
		// Remove console logs in production
		removeConsole: process.env.NODE_ENV === 'production',
	},
	// Enable source maps for better debugging
	productionBrowserSourceMaps: true,
	// Add security headers
	async headers() {
		const headerList = [
			{
				source: '/(.*)',
				headers: [
					{ key: 'X-Frame-Options', value: 'DENY' },
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin',
					},
					{ key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
				],
			},
		];

		if (process.env.NODE_ENV !== 'development') {
			headerList.push(
				// Cache JSON with revalidation. Cache for a day; allow revalidation via ETag/Last-Modified.
				{
					source: '/chart-data-reference.json',
					headers: [
						{
							key: 'Cache-Control',
							value: 'public, max-age=0, s-maxage=86400, must-revalidate',
						},
					],
				},
				{
					source: '/chart-data-meta.json',
					headers: [
						{
							key: 'Cache-Control',
							value: 'public, max-age=0, s-maxage=300, must-revalidate',
						},
					],
				}
			);
		}

		return headerList;
	},
};

export default nextConfig;
