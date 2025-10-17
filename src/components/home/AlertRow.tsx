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
			className='flex h-[60px] items-center rounded-[14px] border border-[color:var(--ie-border)] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(245,247,255,1)_100%)] px-4 shadow-[var(--ie-shadow-soft)] transition-colors hover:border-[color:var(--ie-primary)] hover:bg-white sm:h-[64px] sm:px-5'
		>
			<div className='text-sm font-medium text-[color:var(--ie-text)] sm:text-base'>
				{title}
			</div>
			{newCount > 0 ? <NewInsightsBadge count={newCount} /> : null}
			<div className='ml-auto text-[color:var(--ie-primary)]'>
				<ChevronRight size={16} className='sm:h-5 sm:w-5' />
			</div>
		</Link>
	);
}
