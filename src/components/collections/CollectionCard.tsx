'use client';

import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import ReactECharts from 'echarts-for-react';
import { Ellipsis, Expand, Sparkles, Star } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import usaJson from '@/data/USA.json';

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

	// resolve CSS variables inside ECharts option on client
	function resolveCssVar(value: unknown): unknown {
		if (typeof window === 'undefined') return value;
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
		if (!option) return undefined;
		if (typeof window === 'undefined') return option;
		return deepResolveCssVars(option) as EChartsOption;
	}, [option, deepResolveCssVars]);

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
		<div className='rounded-[14px] border border-[color:var(--ie-border)] bg-white shadow-[var(--ie-shadow-soft)]'>
			{/* header strip with badge */}
			<div className='flex items-center justify-between rounded-t-[14px] bg-[color:var(--ie-badge-bg)] px-4 py-2 text-sm font-semibold text-[color:var(--ie-nav)]'>
				<div className='flex items-center gap-2'>
					<Sparkles size={16} />
					{newCount > 0 ? (
						<span>{`+ ${newCount} New`}</span>
					) : (
						<span>Recommended</span>
					)}
				</div>
				<div className='ml-auto flex items-center gap-1 text-[color:var(--ie-text-muted)]'>
					<button className='rounded-full p-1 hover:bg-[color:var(--ie-badge-bg)]'>
						<Expand size={16} />
					</button>
					<button
						className='rounded-full p-1 hover:bg-[color:var(--ie-badge-bg)]'
						onClick={() => setFavourite((v) => !v)}
					>
						<Star
							size={16}
							className={
								favourite
									? 'text-[color:var(--ie-primary)]'
									: ''
							}
							fill={favourite ? 'currentColor' : 'none'}
						/>
					</button>
					<button className='rounded-full p-1 hover:bg-[color:var(--ie-badge-bg)]'>
						<Ellipsis size={16} />
					</button>
				</div>
			</div>
			{/* title */}
			<div className='px-4 pt-3 pb-2 text-[15px] font-semibold text-[color:var(--ie-text)]'>
				{title}
			</div>
			{/* preview area */}
			<div className='px-4 pb-4'>
				<div className='rounded-[12px] border border-[color:var(--ie-border)] bg-[color:var(--ie-surface)] p-2'>
					{resolvedOption ? (
						isMapUSA && !mapReady ? (
							<div className='h-[180px] w-full rounded-md bg-[color:var(--ie-surface-muted)]' />
						) : (
							<ReactECharts
								option={resolvedOption}
								notMerge
								lazyUpdate
								style={{ height: 180 }}
							/>
						)
					) : (
						(preview ?? (
							<div className='h-[180px] w-full rounded-md bg-[color:var(--ie-surface-muted)]' />
						))
					)}
				</div>
				{/* pagination dots */}
				<div className='mt-3 flex items-center justify-center gap-1'>
					<span className='h-1.5 w-1.5 rounded-full bg-[color:var(--ie-chart-light-gray)]' />
					<span className='h-1.5 w-4 rounded-full bg-[color:var(--ie-primary)]' />
					<span className='h-1.5 w-1.5 rounded-full bg-[color:var(--ie-chart-light-gray)]' />
				</div>
			</div>
		</div>
	);
}
