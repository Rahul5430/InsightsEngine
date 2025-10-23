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
			className={`tablet:px-2.25 flex-shrink-0 rounded-md px-2 py-1 text-[10px] transition-colors sm:py-1.5 sm:text-xs md:px-2 md:text-sm lg:px-2.5 ${
				current === item.key
					? 'text-nav bg-white shadow'
					: 'text-white/90 hover:bg-white/10'
			}`}
		>
			{item.label}
		</Link>
	);

	return (
		<div className='flex h-full items-center gap-1.5 overflow-hidden overflow-x-auto rounded-lg border border-white/30 bg-white/15 px-2 py-2 backdrop-blur sm:gap-2 md:flex-wrap'>
			{items.map(chip)}
		</div>
	);
}
