import { ReactNode } from 'react';

type Props = {
	title: string;
	value: string;
	trend?: string;
	trendColor?: 'success' | 'danger' | 'warning' | 'muted';
	trailing?: ReactNode;
	fetchPriority?: 'high' | 'low' | 'auto';
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
	fetchPriority = 'auto',
}: Props) {
	function deriveTrendParts(input: string): string[] {
		const normalized = input.replace(/\s+/g, ' ').trim();

		// Try common separators first
		const separators = ['|', ',', ' • ', ' · ', ' / ', ' - ', ' – ', ' — '];

		for (const sep of separators) {
			if (normalized.includes(sep)) {
				return normalized
					.split(sep)
					.map((p) => p.trim())
					.filter(Boolean);
			}
		}

		// If no separators found, return as single part
		return [normalized];
	}

	const trendParts = trend ? deriveTrendParts(trend) : undefined;

	return (
		<div
			className='ie-card-hover group relative min-h-[80px] overflow-hidden rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-lg hover:border-slate-300 sm:min-h-[120px] sm:px-6 sm:pt-6 sm:pb-8 lg:min-h-[140px]'
			{...(fetchPriority !== 'auto' && { fetchPriority })}
		>
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

				<div className='mt-2 grid grid-cols-1 gap-1 sm:mt-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4'>
					<div>
						<div className='text-lg font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl'>
							{value}
						</div>
					</div>
					{trend ? (
						<div
							className={`mb-2 text-left text-xs leading-relaxed font-medium sm:mb-0 sm:text-right ${trendColorToClass[trendColor]}`}
						>
							{/* Single line for mobile and tablet */}
							<div className='block break-words lg:hidden'>
								{trend}
							</div>
							{/* Split lines for desktop */}
							<div className='hidden lg:block'>
								{trendParts && trendParts.length > 1 ? (
									<>
										<div className='whitespace-nowrap'>
											{trendParts[0]}
										</div>
										{trendParts[1] ? (
											<div className='mt-0.5 flex items-center justify-start gap-2 sm:justify-end'>
												<span className='h-4 w-px bg-emerald-500/40' />
												<span className='whitespace-nowrap'>
													{trendParts[1]}
												</span>
											</div>
										) : null}
									</>
								) : (
									<div className='break-words'>{trend}</div>
								)}
							</div>
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
