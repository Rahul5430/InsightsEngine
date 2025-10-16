'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type Tab = 'all' | 'performance' | 'field-force' | 'patient' | 'pmr';

function buildHref(pathname: string, tab: Tab) {
	const params = new URLSearchParams();
	if (tab !== 'all') params.set('tab', tab);
	const qs = params.toString();
	return qs ? `${pathname}?${qs}` : pathname;
}

export function WorkspaceTabs() {
	const pathname = usePathname();
	const search = useSearchParams();
	const current = (search.get('tab') as Tab) || 'all';

	const chip = (tab: Tab, label: string) => (
		<Link
			key={tab}
			href={buildHref(pathname, tab)}
			className={`cursor-pointer rounded-[12px] px-3 py-1 text-sm ${
				current === tab
					? 'bg-white text-[color:var(--ie-nav)] shadow'
					: 'text-white/90 hover:bg-white/10'
			}`}
		>
			{label}
		</Link>
	);

	return (
		<div className='flex items-center gap-2 rounded-[14px] border border-white/30 bg-white/15 px-2 py-2 backdrop-blur'>
			{chip('all', 'All')}
			{chip('performance', 'Performance')}
			{chip('field-force', 'Field Force')}
			{chip('patient', 'Patient')}
			{chip('pmr', 'PMR')}
		</div>
	);
}
