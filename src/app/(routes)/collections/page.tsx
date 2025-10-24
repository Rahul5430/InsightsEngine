'use client';

import type { EChartsOption } from 'echarts';
import { MapChart } from 'echarts/charts';
import {
	GeoComponent,
	LegendComponent,
	TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { ListFilter, Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';

import { CollectionCard } from '@/components/collections/CollectionCard';
import { CollectionsTabs } from '@/components/collections/CollectionsTabs';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { ChartCard } from '@/components/workspace/ChartCard';
import { ChartCardSkeleton } from '@/components/workspace/ChartCardSkeleton';
import {
	type ChartDataConfig,
	getChartDataById,
	loadChartData,
	transformChartData,
} from '@/lib/chart-data-transformer';

// Register map/geo renderer parts required for USA map
echarts.use([
	MapChart,
	GeoComponent,
	TooltipComponent,
	LegendComponent,
	CanvasRenderer,
]);

export default function CollectionsPage({
	searchParams,
}: {
	searchParams?: Record<string, string | string[] | undefined>;
}) {
	const current = (searchParams?.c as string) || 'favorites';
	const [chartConfig, setChartConfig] = useState<ChartDataConfig | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				const config = await loadChartData();
				setChartConfig(config);
			} catch (err) {
				setError('Failed to load chart data');
				// eslint-disable-next-line no-console
				console.error('Error loading chart data:', err);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, []);

	// Helper function to get chart option by ID
	const getChartOption = (chartId: string): EChartsOption | null => {
		if (!chartConfig) return null;
		const chartData = getChartDataById(chartConfig, chartId);
		return chartData ? transformChartData(chartData) : null;
	};

	// Helper function to create collection card
	const createCollectionCard = (collection: {
		title: string;
		chart: string;
		newCount?: number;
	}) => {
		const chartOption = getChartOption(collection.chart);
		if (!chartOption) return null;

		return (
			<CollectionCard
				key={collection.title}
				title={collection.title}
				option={chartOption}
				newCount={collection.newCount}
			/>
		);
	};

	// Helper function to create chart card
	const createChartCard = (
		chartId: string,
		title?: string,
		source?: string
	) => {
		if (!chartConfig) return null;
		const chartData = getChartDataById(chartConfig, chartId);
		if (!chartData) return null;

		const chartOption = transformChartData(chartData);
		return (
			<ChartCard
				key={chartId}
				title={title || chartData.title}
				option={chartOption}
				recommended={chartData.recommended}
				source={
					source || 'Source: Vaccelerator (FCT_CUST_FINANCE) Sep 2025'
				}
			/>
		);
	};

	return (
		<main className='min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100'>
			{/* Hero Section */}
			<div className='relative overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-blue-500 opacity-90' />
				<div className='bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] absolute inset-0 opacity-20' />

				<div className='relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20'>
					<div className='flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between'>
						<div>
							<h1 className='text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl'>
								Collections
							</h1>
							<p className='mt-2 text-lg text-white/90 sm:text-xl'>
								Organize and manage your insights
							</p>
						</div>

						<div className='flex h-11 w-full flex-row gap-4 sm:h-12.5 sm:w-auto sm:items-center sm:gap-6'>
							<div className='flex h-full items-center gap-4 sm:gap-6'>
								<Suspense fallback={null}>
									<CollectionsTabs />
								</Suspense>
								<FilterPanel
									trigger={
										<button
											aria-label='Open filters panel'
											className='ie-button-hover ie-touch-target flex h-full items-center justify-center rounded-lg border border-white/20 bg-white/10 px-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20 sm:justify-between sm:gap-2 sm:px-3'
										>
											<ListFilter size={15} />
											<span className='inline max-sm:hidden max-lg:md:hidden'>
												Filters
											</span>
										</button>
									}
								/>
							</div>
							<Link
								href='/collections/create'
								className='ie-button-hover ie-touch-target flex h-full items-center justify-center rounded-lg bg-white px-2 py-3 text-sm font-semibold text-slate-800 shadow-lg hover:bg-white/95 sm:gap-2 sm:px-3'
							>
								<Plus size={18} />
								<span className='inline max-sm:hidden max-lg:md:hidden'>
									Create Collection
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className='mx-auto max-w-7xl px-4 py-16 sm:px-6'>
				{loading ? (
					// Show skeleton loading state
					current === 'collections' ? (
						<div className='grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
							<ChartCardSkeleton />
							<ChartCardSkeleton />
							<ChartCardSkeleton />
							<ChartCardSkeleton />
							<ChartCardSkeleton />
							<ChartCardSkeleton />
						</div>
					) : (
						<div className='grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3'>
							<ChartCardSkeleton />
							<ChartCardSkeleton />
							<ChartCardSkeleton />
							<ChartCardSkeleton />
							<ChartCardSkeleton />
							<ChartCardSkeleton />
						</div>
					)
				) : error ? (
					// Show error state
					<div className='flex min-h-96 items-center justify-center'>
						<div className='text-center'>
							<div className='mb-4 text-6xl text-red-500'>⚠️</div>
							<h2 className='mb-2 text-2xl font-bold text-slate-900'>
								Error Loading Data
							</h2>
							<p className='text-slate-600'>
								{error || 'Chart data not available'}
							</p>
						</div>
					</div>
				) : chartConfig ? (
					// Show actual content when data is loaded
					current === 'collections' ? (
						<div className='grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
							{chartConfig.pageLayouts.collections.collections.map(
								(collection) => createCollectionCard(collection)
							)}
						</div>
					) : (
						<div className='grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3'>
							{/* Favorites/Reports: use charts from JSON */}
							{chartConfig.pageLayouts.collections.favorites.map(
								(chartId: string) => createChartCard(chartId)
							)}
						</div>
					)
				) : null}
			</div>
		</main>
	);
}
