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
		<div className='flex h-[124px] flex-col justify-between rounded-[14px] border border-[color:var(--ie-border)] bg-white p-5 shadow-[var(--ie-shadow-card)]'>
			<div className='flex items-start justify-between'>
				<div className='text-sm font-semibold text-[color:var(--ie-text-muted)]'>
					{title}
				</div>
				{trailing}
			</div>
			<div className='mt-2 flex items-end justify-between gap-3'>
				<div className='text-[24px] leading-none font-semibold tracking-tight text-[color:var(--ie-text)]'>
					{value}
				</div>
				{trend ? (
					<div
						className={`text-right text-[11px] leading-tight font-medium ${trendColorToClass[trendColor]}`}
					>
						{trend}
					</div>
				) : null}
			</div>
		</div>
	);
}
