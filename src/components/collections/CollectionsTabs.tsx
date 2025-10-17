'use client';

import { RouteTabs } from '@/components/tabs/RouteTabs';

export function CollectionsTabs() {
	return (
		<RouteTabs
			param='c'
			defaultKey='favorites'
			items={[
				{ key: 'favorites', label: 'Favorites' },
				{ key: 'collections', label: 'Collections' },
				{ key: 'reports', label: 'Reports' },
			]}
		/>
	);
}
