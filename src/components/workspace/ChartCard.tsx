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
		<div className='overflow-hidden rounded-[14px] border border-[color:var(--ie-border)] bg-white px-3 pb-2 shadow-[var(--ie-shadow-soft)]'>
			<div className='mb-3 flex items-center justify-between'>
				<div className='-ml-4 flex h-10 items-center rounded-br-3xl bg-[color:var(--ie-badge-bg)] px-4 text-sm font-semibold text-[color:var(--ie-nav)] shadow-[0_1px_0_rgba(10,84,198,0.06)]'>
					<AIIcon size={16} />
					{recommended ? (
						<span className='ml-2'>Recommended</span>
					) : null}
				</div>
				<div className='ml-auto flex flex-row'>
					<button
						type='button'
						aria-label='Expand'
						onClick={(e) => {
							e.stopPropagation();
						}}
						className='cursor-pointer rounded-full p-2 text-[color:var(--ie-text-muted)] transition-colors hover:bg-[color:var(--ie-badge-bg)] hover:text-[color:var(--ie-primary)]'
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
						className='cursor-pointer rounded-full p-2 text-[color:var(--ie-text-muted)] transition-colors hover:bg-[color:var(--ie-badge-bg)] hover:text-[color:var(--ie-primary)]'
					>
						{favourite ? (
							<Star
								size={16}
								fill='currentColor'
								className='text-[color:var(--ie-primary)]'
							/>
						) : (
							<Star size={16} />
						)}
					</button>
					<button
						type='button'
						aria-label='Filter'
						onClick={(e) => {
							e.stopPropagation();
						}}
						className='cursor-pointer rounded-full p-2 text-[color:var(--ie-text-muted)] transition-colors hover:bg-[color:var(--ie-badge-bg)] hover:text-[color:var(--ie-primary)]'
					>
						<ListFilter size={16} />
					</button>
					<RowMenu
						trigger={
							<button
								type='button'
								aria-label='More'
								onClick={(e) => e.stopPropagation()}
								className='cursor-pointer rounded-full p-2 text-[color:var(--ie-text-muted)] transition-colors hover:bg-[color:var(--ie-badge-bg)] hover:text-[color:var(--ie-primary)]'
							>
								<Ellipsis size={16} />
							</button>
						}
					/>
				</div>
			</div>

			{/* Title */}
			<div className='mb-2 text-[15px] font-medium text-[color:var(--ie-text)]'>
				{title}
			</div>

			{isMapUSA ? (
				mapReady ? (
					<ReactECharts
						option={resolvedOption}
						notMerge
						lazyUpdate
						style={{
							height: 240,
							pointerEvents: interactive ? 'auto' : 'none',
						}}
					/>
				) : (
					<div className='h-[240px] w-full rounded-md bg-[color:var(--ie-surface-muted)]' />
				)
			) : (
				<ReactECharts
					option={resolvedOption}
					notMerge
					lazyUpdate
					style={{
						height: 240,
						pointerEvents: interactive ? 'auto' : 'none',
					}}
				/>
			)}

			{/* Source */}
			{source ? (
				<div className='mt-3 text-sm text-[color:var(--ie-text-muted)]'>
					{source}
				</div>
			) : null}
		</div>
	);
}
