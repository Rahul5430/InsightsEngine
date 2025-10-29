'use client';

import { Ellipsis, Expand, ListFilter, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';

import { AIIcon } from '@/components/common/AIIcon';
import { RowMenu } from '@/components/workspace/RowMenu';
import type { ChartData } from '@/lib/chart-data-transformer';
import { ChartJsChart } from '@/lib/chartjs-transformer';

type BaseProps = {
	title: string;
	chartData?: ChartData;
};

type ChartVariantProps = BaseProps & {
	variant: 'chart';
	source?: string;
	recommended?: boolean;
	interactive?: boolean;
};

type CollectionVariantProps = BaseProps & {
	variant: 'collection';
	newCount?: number;
	preview?: React.ReactNode;
};

export type ChartCardProps = ChartVariantProps | CollectionVariantProps;

export function ChartCard(props: ChartCardProps) {
	const { title, chartData } = props;
	const [favourite, setFavourite] = useState(false);

	const useChartJs = chartData && chartData.type;

	const isChartVariant = props.variant === 'chart';
	const interactive = isChartVariant ? (props.interactive ?? true) : true;
	const recommended = isChartVariant ? (props.recommended ?? false) : false;
	const source = isChartVariant
		? props.source || 'Source: Vaccelerator (FCT_CUST_FINANCE) Sep 2025'
		: undefined;

	return (
		<div className='ie-card-hover group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg hover:border-slate-300'>
			<div className='relative bg-gradient-to-r from-slate-50 to-slate-100 px-3 py-3 md:px-6 md:py-4'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2 md:gap-3'>
						<div className='flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10 md:h-8 md:w-8'>
							{isChartVariant ? (
								<AIIcon
									size={14}
									className='text-blue-500 md:h-4 md:w-4'
								/>
							) : (
								<Sparkles
									size={14}
									className='text-blue-500 md:h-4 md:w-4'
								/>
							)}
						</div>
						{isChartVariant ? (
							recommended ? (
								<span className='text-xs font-semibold text-blue-500 md:text-sm'>
									Recommended
								</span>
							) : (
								<span className='text-xs font-semibold text-slate-500 md:text-sm'>
									Chart
								</span>
							)
						) : (
							<div className='flex items-center gap-2'>
								{(props as CollectionVariantProps).newCount &&
								(props as CollectionVariantProps).newCount! >
									0 ? (
									<span className='text-xs font-semibold text-blue-500 md:text-sm'>
										+
										{
											(props as CollectionVariantProps)
												.newCount
										}{' '}
										New
									</span>
								) : (
									<span className='text-xs font-semibold text-blue-500 md:text-sm'>
										Collection
									</span>
								)}
							</div>
						)}
					</div>

					<div className='flex items-center gap-0.5 md:gap-1'>
						<button
							type='button'
							aria-label='Expand'
							disabled={!interactive}
							onClick={(e) => {
								if (interactive) {
									e.stopPropagation();
								}
							}}
							className={`ie-button-hover ie-touch-target rounded-lg p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 md:p-2 ${!interactive ? 'cursor-not-allowed opacity-50' : ''}`}
						>
							<Expand
								size={14}
								className='mx-auto md:h-4 md:w-4'
							/>
						</button>
						<button
							type='button'
							aria-label='Star'
							disabled={!interactive}
							onClick={(e) => {
								if (interactive) {
									e.stopPropagation();
									setFavourite((v) => !v);
								}
							}}
							className={`ie-button-hover ie-touch-target rounded-lg p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 md:p-2 ${!interactive ? 'cursor-not-allowed opacity-50' : ''}`}
						>
							<Star
								size={14}
								className={`mx-auto md:h-4 md:w-4 ${favourite ? 'text-amber-500' : ''}`}
								fill={favourite ? 'currentColor' : 'none'}
							/>
						</button>
						{isChartVariant ? (
							<button
								type='button'
								aria-label='Filter'
								disabled={!interactive}
								onClick={(e) => {
									if (interactive) {
										e.stopPropagation();
									}
								}}
								className={`ie-button-hover ie-touch-target rounded-lg p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 md:p-2 ${!interactive ? 'cursor-not-allowed opacity-50' : ''}`}
							>
								<ListFilter
									size={14}
									className='mx-auto md:h-4 md:w-4'
								/>
							</button>
						) : null}
						{isChartVariant ? (
							<RowMenu
								trigger={
									<button
										type='button'
										aria-label='More'
										onClick={(e) => e.stopPropagation()}
										className='ie-button-hover ie-touch-target rounded-lg p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 md:p-2'
									>
										<Ellipsis
											size={14}
											className='mx-auto md:h-4 md:w-4'
										/>
									</button>
								}
							/>
						) : (
							<button
								type='button'
								aria-label='More'
								className='ie-button-hover ie-touch-target rounded-lg p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 md:p-2'
							>
								<Ellipsis size={14} className='md:h-4 md:w-4' />
							</button>
						)}
					</div>
				</div>
			</div>

			<div className='px-3 pt-3 md:px-6 md:pt-4'>
				<h2 className='text-base leading-tight font-semibold text-slate-900 md:text-lg'>
					{title}
				</h2>
			</div>

			<div className='p-3 pt-3 md:p-6 md:pt-4'>
				<div className='rounded-lg border border-slate-200 bg-white p-2 shadow-sm md:p-4'>
					{useChartJs && chartData ? (
						<ChartJsChart chartData={chartData} height={280} />
					) : (
						props.variant === 'collection' &&
						(props.preview ?? (
							<div className='h-[280px] w-full animate-pulse rounded-md bg-gradient-to-br from-slate-100 to-slate-50' />
						))
					)}
				</div>

				{props.variant === 'collection' ? (
					<div className='mt-3 flex items-center justify-center gap-2 md:mt-4'>
						<span className='h-2 w-2 rounded-full bg-slate-300' />
						<span className='h-2 w-6 rounded-full bg-blue-500' />
						<span className='h-2 w-2 rounded-full bg-slate-300' />
					</div>
				) : null}
			</div>

			{isChartVariant && source ? (
				<div className='px-3 pb-3 md:px-6 md:pb-6'>
					<div className='rounded-lg bg-slate-200 px-2 py-2 md:px-4 md:py-3'>
						<p className='text-xs leading-relaxed text-slate-700'>
							{source}
						</p>
					</div>
				</div>
			) : null}

			<div className='absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300 group-hover:w-full' />
		</div>
	);
}
