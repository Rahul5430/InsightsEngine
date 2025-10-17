import { ReactNode } from 'react';

// no badge inside KPI; trend rendered as right-aligned text to match design

type Props = {
	title: string;
	value: string;
	trend?: string;
	trendColor?: 'success' | 'danger' | 'warning' | 'muted';
	trailing?: ReactNode;
};

const trendColorToClass: Record<NonNullable<Props['trendColor']>, string> = {
	success: 'text-[color:var(--ie-success)]',
	danger: 'text-[color:var(--ie-danger)]',
	warning: 'text-[color:var(--ie-warning)]',
	muted: 'text-[color:var(--ie-text-muted)]',
};

export function KpiCard({
	title,
	value,
	trend,
	trendColor = 'success',
	trailing,
}: Props) {
	return (
		<div className='flex h-[110px] flex-col justify-between rounded-[14px] border border-[color:var(--ie-border)] bg-white p-3 shadow-[var(--ie-shadow-card)] sm:h-[124px] sm:p-5'>
			<div className='flex items-start justify-between'>
				<div className='text-[10px] font-semibold text-[color:var(--ie-text-muted)] sm:text-sm'>
					{title}
				</div>
				{trailing}
			</div>
			<div className='mt-1 flex items-end justify-between gap-1 sm:mt-2 sm:gap-3'>
				<div className='text-sm leading-none font-semibold tracking-tight text-[color:var(--ie-text)] sm:text-[24px]'>
					{value}
				</div>
				{trend ? (
					<div
						className={`text-right text-[9px] leading-tight font-medium sm:text-[11px] ${trendColorToClass[trendColor]}`}
					>
						{trend}
					</div>
				) : null}
			</div>
		</div>
	);
}
