'use client';

import { Ellipsis, Expand, ListFilter, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { AIIcon } from '@/components/common/AIIcon';
import { deepResolveCssVars } from '@/lib/css-var-resolver';
import type { EChartsOption } from '@/lib/echarts-optimized';
import { echarts, ReactECharts } from '@/lib/echarts-optimized';

import { RowMenu } from './RowMenu';

type Props = {
	title: string;
	option: EChartsOption; // echarts option object
	source?: string;
	recommended?: boolean;
	interactive?: boolean; // when false, disable inner interactions (for selectable grids)
};

export function ChartCard({
	title,
	option,
	source = 'Source: Vaccelerator (FCT_CUST_FINANCE) Sep 2025',
	recommended = false,
	interactive = true,
}: Props) {
	const [favourite, setFavourite] = useState(false);

	const isMapUSA = useMemo(() => {
		try {
			const opt = option as unknown as {
				series?: Array<Record<string, unknown>>;
				geo?: { map?: unknown };
			};
			const series = Array.isArray(opt.series) ? opt.series : [];
			const seriesHasUSA = series.some((s) => {
				const map = (s as Record<string, unknown>).map as
					| string
					| undefined;
				const type = (s as Record<string, unknown>).type as
					| string
					| undefined;
				return Boolean(map === 'USA' && type === 'map');
			});
			const geoHasUSA = Boolean(opt.geo && opt.geo.map === 'USA');
			return Boolean(seriesHasUSA || geoHasUSA);
		} catch {
			return false;
		}
	}, [option]);

	const [mapReady, setMapReady] = useState<boolean>(() => !isMapUSA);

	// Use optimized CSS variable resolver

	const resolvedOption = useMemo(() => {
		if (typeof window === 'undefined') return option;
		return deepResolveCssVars(option) as EChartsOption;
	}, [option]);

	// Ensure USA map is registered on the client when needed
	useEffect(() => {
		if (typeof window === 'undefined') return;
		if (!isMapUSA) {
			return;
		}

		let cancelled = false;
		(async () => {
			try {
				const mod = await import('@/data/USA.json');
				if (cancelled) return;
				// @ts-expect-error registerMap accepts GeoJSON; local JSON matches shape
				echarts.registerMap('USA', mod.default);
				queueMicrotask(() => setMapReady(true));
			} catch {
				// ignore if dynamic import fails
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [isMapUSA, resolvedOption, mapReady]);

	// Map registration handled where map options are used; nothing to do here

	return (
		<div className='ie-card-hover group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg hover:border-slate-300'>
			{/* Header with modern badge */}
			<div className='relative bg-gradient-to-r from-slate-50 to-slate-100 px-3 py-3 md:px-6 md:py-4'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2 md:gap-3'>
						<div className='flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10 md:h-8 md:w-8'>
							<AIIcon
								size={14}
								className='text-blue-500 md:h-4 md:w-4'
							/>
						</div>
						{recommended ? (
							<span className='text-xs font-semibold text-blue-500 md:text-sm'>
								Recommended
							</span>
						) : (
							<span className='text-xs font-semibold text-slate-500 md:text-sm'>
								Chart
							</span>
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
							<Expand size={14} className='md:h-4 md:w-4' />
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
								className={`md:h-4 md:w-4 ${favourite ? 'text-amber-500' : ''}`}
								fill={favourite ? 'currentColor' : 'none'}
							/>
						</button>
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
							<ListFilter size={14} className='md:h-4 md:w-4' />
						</button>
						{interactive ? (
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
											className='md:h-4 md:w-4'
										/>
									</button>
								}
							/>
						) : (
							<button
								type='button'
								aria-label='More'
								disabled
								className='ie-button-hover ie-touch-target cursor-not-allowed rounded-lg p-1.5 text-slate-500 opacity-50 md:p-2'
							>
								<Ellipsis size={14} className='md:h-4 md:w-4' />
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Title */}
			<div className='px-3 pt-3 md:px-6 md:pt-4'>
				<h2 className='text-base leading-tight font-semibold text-slate-900 md:text-lg'>
					{title}
				</h2>
			</div>

			{/* Chart area */}
			<div className='p-3 pt-3 md:p-6 md:pt-4'>
				<div className='rounded-lg border border-slate-200 bg-white p-2 shadow-sm md:p-4'>
					{isMapUSA ? (
						mapReady ? (
							<ReactECharts
								option={resolvedOption}
								theme='insights-engine'
								notMerge
								lazyUpdate
								opts={{
									renderer: 'canvas',
								}}
								style={{
									height: 280,
									pointerEvents: interactive
										? 'auto'
										: 'none',
								}}
							/>
						) : (
							<div className='h-[280px] w-full animate-pulse rounded-md bg-gradient-to-br from-slate-100 to-slate-50' />
						)
					) : (
						<ReactECharts
							option={resolvedOption}
							theme='insights-engine'
							notMerge
							lazyUpdate
							opts={{
								renderer: 'canvas',
							}}
							style={{
								height: 280,
								pointerEvents: interactive ? 'auto' : 'none',
							}}
						/>
					)}
				</div>
			</div>

			{/* Source */}
			{source ? (
				<div className='px-3 pb-3 md:px-6 md:pb-6'>
					<div className='rounded-lg bg-slate-200 px-2 py-2 md:px-4 md:py-3'>
						<p className='text-xs leading-relaxed text-slate-700'>
							{source}
						</p>
					</div>
				</div>
			) : null}

			{/* Subtle accent line */}
			<div className='absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300 group-hover:w-full' />
		</div>
	);
}
