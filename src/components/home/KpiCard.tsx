import { ReactNode } from 'react';

type Props = {
	title: string;
	value: string;
	trend?: string;
	trendColor?: 'success' | 'danger' | 'warning' | 'muted';
	trailing?: ReactNode;
};

const trendColorToClass: Record<NonNullable<Props['trendColor']>, string> = {
	success: 'text-emerald-600',
	danger: 'text-red-600',
	warning: 'text-amber-600',
	muted: 'text-slate-500',
};

export function KpiCard({
	title,
	value,
	trend,
	trendColor = 'success',
	trailing,
}: Props) {
	return (
		<div className='ie-card-hover group relative min-h-[140px] overflow-hidden rounded-xl border border-slate-200 bg-white px-6 pt-6 pb-8 shadow-lg hover:border-slate-300'>
			{/* Subtle gradient overlay */}
			<div className='absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

			<div className='relative flex h-full flex-col'>
				<div className='mb-2 flex items-start justify-between'>
					<div className='text-xs font-medium tracking-wide text-slate-500 uppercase'>
						{title}
					</div>
					{trailing && (
						<div className='opacity-100 duration-300'>
							{trailing}
						</div>
					)}
				</div>

				<div className='mt-6 flex items-baseline justify-between gap-4'>
					<div className='flex-1'>
						<div className='text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>
							{value}
						</div>
					</div>
					{trend ? (
						<div
							className={`text-right text-xs leading-relaxed font-medium ${trendColorToClass[trendColor]} max-w-[120px] flex-shrink-0`}
						>
							{trend}
						</div>
					) : null}
				</div>

				{/* Spacer for accent line */}
				<div className='flex-1' />

				{/* Subtle accent line */}
				<div className='absolute bottom-0 left-0 z-10 h-1.5 w-1/3 bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300 group-hover:w-full' />
			</div>
		</div>
	);
}
