'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type TabItem = { key: string; label: string };

function buildHref(
	pathname: string,
	key: string,
	param: string,
	defaultKey: string
) {
	const params = new URLSearchParams();
	if (key && key !== defaultKey) params.set(param, key);
	const qs = params.toString();
	return qs ? `${pathname}?${qs}` : pathname;
}

type Props = {
	param: string; // e.g., 'tab'
	items: TabItem[];
	defaultKey?: string; // default selected key when query missing
};

export function RouteTabs({ param, items, defaultKey = 'all' }: Props) {
	const pathname = usePathname();
	const search = useSearchParams();
	const current = (search.get(param) as string) || defaultKey;

	const chip = (item: TabItem) => (
		<Link
			key={item.key}
			href={buildHref(pathname, item.key, param, defaultKey)}
			className={`min-w-0 rounded-full px-2.5 py-1 text-xs whitespace-nowrap transition-colors sm:px-3 sm:py-1.5 sm:text-sm ${
				current === item.key
					? 'bg-white text-[color:var(--ie-nav)] shadow'
					: 'text-white/90 hover:bg-white/10'
			}`}
		>
			{item.label}
		</Link>
	);

	return (
		<div className='flex w-full items-center gap-2 overflow-x-auto rounded-[14px] border border-white/30 bg-white/15 px-2 py-2 whitespace-nowrap backdrop-blur md:flex-wrap md:overflow-visible md:whitespace-normal'>
			{items.map(chip)}
		</div>
	);
}
