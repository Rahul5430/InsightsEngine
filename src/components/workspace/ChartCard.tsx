'use client';

import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import ReactECharts from 'echarts-for-react';
import { Ellipsis, Expand, ListFilter, Star } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { AIIcon } from '@/components/common/AIIcon';

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

	function resolveCssVar(value: unknown): unknown {
		if (typeof value === 'string' && value.startsWith('var(')) {
			const varName = value.slice(4, -1).trim();
			const resolved = getComputedStyle(document.documentElement)
				.getPropertyValue(varName)
				.trim();
			return resolved || value;
		}
		return value;
	}

	const deepResolveCssVars = useCallback((input: unknown): unknown => {
		const self = (x: unknown): unknown => {
			if (Array.isArray(x)) return x.map(self);
			if (x && typeof x === 'object') {
				const out: Record<string, unknown> = {};
				for (const [k, v] of Object.entries(
					x as Record<string, unknown>
				)) {
					out[k] = self(v);
				}
				return out;
			}
			return resolveCssVar(x);
		};
		return self(input);
	}, []);

	const resolvedOption = useMemo(() => {
		if (typeof window === 'undefined') return option;
		return deepResolveCssVars(option) as EChartsOption;
	}, [option, deepResolveCssVars]);

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
			<div className='relative bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10'>
							<AIIcon size={16} className='text-blue-500' />
						</div>
						{recommended ? (
							<span className='text-sm font-semibold text-blue-500'>
								Recommended
							</span>
						) : (
							<span className='text-sm font-semibold text-slate-500'>
								Chart
							</span>
						)}
					</div>

					<div className='flex items-center gap-1'>
						<button
							type='button'
							aria-label='Expand'
							onClick={(e) => {
								e.stopPropagation();
							}}
							className='ie-button-hover ie-touch-target rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900'
						>
							<Expand size={16} />
						</button>
						<button
							type='button'
							aria-label='Star'
							onClick={(e) => {
								e.stopPropagation();
								setFavourite((v) => !v);
							}}
							className='ie-button-hover ie-touch-target rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900'
						>
							<Star
								size={16}
								className={favourite ? 'text-amber-500' : ''}
								fill={favourite ? 'currentColor' : 'none'}
							/>
						</button>
						<button
							type='button'
							aria-label='Filter'
							onClick={(e) => {
								e.stopPropagation();
							}}
							className='ie-button-hover ie-touch-target rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900'
						>
							<ListFilter size={16} />
						</button>
						<RowMenu
							trigger={
								<button
									type='button'
									aria-label='More'
									onClick={(e) => e.stopPropagation()}
									className='ie-button-hover ie-touch-target rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900'
								>
									<Ellipsis size={16} />
								</button>
							}
						/>
					</div>
				</div>
			</div>

			{/* Title */}
			<div className='px-6 pt-4'>
				<h3 className='text-lg leading-tight font-semibold text-slate-900'>
					{title}
				</h3>
			</div>

			{/* Chart area */}
			<div className='p-6 pt-4'>
				<div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
					{isMapUSA ? (
						mapReady ? (
							<ReactECharts
								option={resolvedOption}
								notMerge
								lazyUpdate
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
							notMerge
							lazyUpdate
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
				<div className='px-6 pb-6'>
					<div className='rounded-lg bg-slate-100 px-4 py-3'>
						<p className='text-xs leading-relaxed text-slate-500'>
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
