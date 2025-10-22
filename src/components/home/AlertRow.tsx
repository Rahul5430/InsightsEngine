import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { NewInsightsBadge } from '@/components/common/NewInsightsBadge';

type Props = {
	title: string;
	newCount?: number;
	href?: string;
};

export function AlertRow({ title, newCount = 0, href = '#' }: Props) {
	return (
		<Link
			href={href}
			className='flex h-[60px] items-center rounded-[14px] border border-slate-200 bg-gradient-to-b from-white to-slate-100 px-4 shadow-sm transition-colors hover:border-slate-800 hover:bg-white sm:h-[64px] sm:px-5'
		>
			<div className='text-sm font-medium text-slate-900 sm:text-base'>
				{title}
			</div>
			{newCount > 0 ? <NewInsightsBadge count={newCount} /> : null}
			<div className='ml-auto text-slate-800'>
				<ChevronRight size={16} className='sm:h-5 sm:w-5' />
			</div>
		</Link>
	);
}
