'use client';

import { Ellipsis, Expand, Sparkles, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import type { ChartData } from '@/lib/chart-data-transformer';
import { ChartJsChart } from '@/lib/chartjs-transformer';
import { deepResolveCssVars } from '@/lib/css-var-resolver';
import type { EChartsOption } from '@/lib/echarts-optimized';
import { echarts, ReactECharts } from '@/lib/echarts-optimized';

type Props = {
	title: string;
	newCount?: number;
	preview?: React.ReactNode;
	option?: EChartsOption; // optional echarts option to render preview
	chartData?: ChartData; // Optional chart data for Chart.js
};

export function CollectionCard({
	title,
	newCount = 0,
	preview,
	option,
	chartData,
}: Props) {
	const [favourite, setFavourite] = useState(false);

	// Determine which chart library to use
	// Use Chart.js for bar, line, and waterfall charts
	// Keep echarts for map charts (better geographic support)
	const useChartJs = chartData && chartData.type;

	const resolvedOption = useMemo(() => {
		if (!option) return undefined;
		if (typeof window === 'undefined') return option;
		return deepResolveCssVars(option) as EChartsOption;
	}, [option]);

	// Detect and register USA map if needed
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

	useEffect(() => {
		if (!isMapUSA) return;
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
	}, [isMapUSA]);

	return (
		<div className='ie-card-hover group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg hover:border-slate-300'>
			{/* Header with modern badge */}
			<div className='relative bg-gradient-to-r from-slate-50 to-slate-100 px-3 py-3 md:px-6 md:py-4'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2 md:gap-3'>
						<div className='flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10 md:h-8 md:w-8'>
							<Sparkles
								size={14}
								className='text-blue-500 md:h-4 md:w-4'
							/>
						</div>
						<div className='flex items-center gap-2'>
							{newCount > 0 ? (
								<>
									<span className='text-xs font-semibold text-blue-500 md:text-sm'>
										+{newCount} New
									</span>
								</>
							) : (
								<span className='text-xs font-semibold text-blue-500 md:text-sm'>
									Collection
								</span>
							)}
						</div>
					</div>

					<div className='flex items-center gap-0.5 md:gap-1'>
						<button className='ie-button-hover ie-touch-target rounded-lg p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 md:p-2'>
							<Expand size={14} className='md:h-4 md:w-4' />
						</button>
						<button
							className='ie-button-hover ie-touch-target rounded-lg p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 md:p-2'
							onClick={() => setFavourite((v) => !v)}
						>
							<Star
								size={14}
								className={`md:h-4 md:w-4 ${favourite ? 'text-amber-500' : ''}`}
								fill={favourite ? 'currentColor' : 'none'}
							/>
						</button>
						<button className='ie-button-hover ie-touch-target rounded-lg p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 md:p-2'>
							<Ellipsis size={14} className='md:h-4 md:w-4' />
						</button>
					</div>
				</div>
			</div>

			{/* Title */}
			<div className='px-3 pt-3 md:px-6 md:pt-4'>
				<h2 className='text-base leading-tight font-semibold text-slate-900 md:text-lg'>
					{title}
				</h2>
			</div>

			{/* Preview area */}
			<div className='p-3 pt-3 md:p-6 md:pt-4'>
				<div className='rounded-lg border border-slate-200 bg-white p-2 shadow-sm md:p-4'>
					{resolvedOption ? (
						isMapUSA && !mapReady ? (
							<div className='h-[280px] w-full animate-pulse rounded-md bg-gradient-to-br from-slate-100 to-slate-50' />
						) : useChartJs && chartData ? (
							<ChartJsChart chartData={chartData} height={280} />
						) : (
							<ReactECharts
								option={resolvedOption}
								theme='insights-engine'
								notMerge
								lazyUpdate
								opts={{
									renderer: 'canvas',
								}}
								style={{ height: 280 }}
							/>
						)
					) : (
						(preview ?? (
							<div className='h-[280px] w-full animate-pulse rounded-md bg-gradient-to-br from-slate-100 to-slate-50' />
						))
					)}
				</div>

				{/* Modern pagination dots */}
				<div className='mt-3 flex items-center justify-center gap-2 md:mt-4'>
					<span className='h-2 w-2 rounded-full bg-slate-300' />
					<span className='h-2 w-6 rounded-full bg-blue-500' />
					<span className='h-2 w-2 rounded-full bg-slate-300' />
				</div>
			</div>

			{/* Subtle accent line */}
			<div className='absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300 group-hover:w-full' />
		</div>
	);
}
