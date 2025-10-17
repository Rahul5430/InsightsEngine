'use client';

import { RouteTabs } from '@/components/tabs/RouteTabs';

export function WorkspaceTabs() {
	return (
		<RouteTabs
			param='tab'
			items={[
				{ key: 'all', label: 'All' },
				{ key: 'performance', label: 'Performance' },
				{ key: 'field-force', label: 'Field Force' },
				{ key: 'patient', label: 'Patient' },
				{ key: 'pmr', label: 'PMR' },
			]}
		/>
	);
}
