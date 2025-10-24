'use client';

import { Ellipsis, Expand, Sparkles, Star } from 'lucide-react';
import { Suspense, useEffect, useMemo, useState } from 'react';

import usaJson from '@/data/USA.json';
import { deepResolveCssVars } from '@/lib/css-var-resolver';
import type { EChartsOption } from '@/lib/echarts-optimized';
import { echarts, ReactECharts } from '@/lib/echarts-optimized';

type Props = {
	title: string;
	newCount?: number;
	preview?: React.ReactNode;
	option?: EChartsOption; // optional echarts option to render preview
};

export function CollectionCard({
	title,
	newCount = 0,
	preview,
	option,
}: Props) {
	const [favourite, setFavourite] = useState(false);

	// Use optimized CSS variable resolver

	const resolvedOption = useMemo(() => {
		if (!option) return undefined;
		if (typeof window === 'undefined') return option;
		return deepResolveCssVars(option) as EChartsOption;
	}, [option]);

	// Detect and register USA map if needed
	const isMapUSA = useMemo(() => {
		try {
			const opt = (option || {}) as {
				series?: Array<Record<string, unknown>>;
				geo?: { map?: unknown };
			};
			const series = Array.isArray(opt.series) ? opt.series : [];
			const seriesHasUSA = series.some(
				(s) =>
					(s.map as string | undefined) === 'USA' &&
					(s.type as string | undefined) === 'map'
			);
			const geoHasUSA = Boolean(
				opt.geo && (opt.geo as { map?: unknown }).map === 'USA'
			);
			return Boolean(seriesHasUSA || geoHasUSA);
		} catch {
			return false;
		}
	}, [option]);

	const [mapReady, setMapReady] = useState<boolean>(() => !isMapUSA);

	useEffect(() => {
		if (!isMapUSA) return;
		try {
			// The USA.json is valid GeoJSON; loosen types for preview usage
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			echarts.registerMap('USA', usaJson as unknown as any);
			queueMicrotask(() => setMapReady(true));
		} catch {
			queueMicrotask(() => setMapReady(true));
		}
	}, [isMapUSA]);

	return (
		<div className='ie-card-hover group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg hover:border-slate-300'>
			{/* Header with modern badge */}
			<div className='relative bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10'>
							<Sparkles size={16} className='text-blue-500' />
						</div>
						<div className='flex items-center gap-2'>
							{newCount > 0 ? (
								<>
									<span className='text-sm font-semibold text-blue-500'>
										+{newCount} New
									</span>
									<span className='rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white'>
										{newCount}
									</span>
								</>
							) : (
								<span className='text-sm font-semibold text-blue-500'>
									Recommended
								</span>
							)}
						</div>
					</div>

					<div className='flex items-center gap-1'>
						<button className='ie-button-hover ie-touch-target rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900'>
							<Expand size={16} />
						</button>
						<button
							className='ie-button-hover ie-touch-target rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900'
							onClick={() => setFavourite((v) => !v)}
						>
							<Star
								size={16}
								className={favourite ? 'text-amber-500' : ''}
								fill={favourite ? 'currentColor' : 'none'}
							/>
						</button>
						<button className='ie-button-hover ie-touch-target rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900'>
							<Ellipsis size={16} />
						</button>
					</div>
				</div>
			</div>

			{/* Title */}
			<div className='px-6 pt-4'>
				<h3 className='text-lg leading-tight font-semibold text-slate-900'>
					{title}
				</h3>
			</div>

			{/* Preview area */}
			<div className='p-6 pt-4'>
				<div className='rounded-lg border border-slate-200 bg-white p-3 shadow-sm'>
					{resolvedOption ? (
						isMapUSA && !mapReady ? (
							<div className='h-[200px] w-full animate-pulse rounded-md bg-gradient-to-br from-slate-100 to-slate-50' />
						) : (
							<Suspense
								fallback={
									<div className='h-[200px] w-full animate-pulse rounded-md bg-gradient-to-br from-slate-100 to-slate-50' />
								}
							>
								<ReactECharts
									option={resolvedOption}
									notMerge
									lazyUpdate
									style={{ height: 200 }}
								/>
							</Suspense>
						)
					) : (
						(preview ?? (
							<div className='h-[200px] w-full animate-pulse rounded-md bg-gradient-to-br from-slate-100 to-slate-50' />
						))
					)}
				</div>

				{/* Modern pagination dots */}
				<div className='mt-4 flex items-center justify-center gap-2'>
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
