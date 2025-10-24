'use client';

import { MapChart } from 'echarts/charts';
import { GeoComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { ListFilter } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';

import { AIIcon } from '@/components/common/AIIcon';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { KpiCard } from '@/components/home/KpiCard';
import { AccordionRow } from '@/components/workspace/AccordionRow';
import { ChartCard } from '@/components/workspace/ChartCard';
import { ChartCardSkeleton } from '@/components/workspace/ChartCardSkeleton';
import { WorkspaceTabs } from '@/components/workspace/WorkspaceTabs';
import {
	type ChartDataConfig,
	getChartsForSection,
	getKpiData,
	loadChartData,
	transformChartData,
} from '@/lib/chart-data-transformer';

echarts.use([MapChart, GeoComponent, CanvasRenderer]);

export default function WorkspacePage() {
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

	// Default KPI data for loading state
	const defaultKpiData = {
		netSales: { title: 'Net Sales', value: 'Loading...', trend: '...' },
		growthNetSales: {
			title: 'Growth Net Sales',
			value: 'Loading...',
			trend: '...',
		},
		dailySales: { title: 'Daily Sales', value: 'Loading...', trend: '...' },
		callActivityVolume: {
			title: 'Call Activity Volume',
			value: 'Loading...',
			trend: '...',
		},
	};

	const kpiData = chartConfig ? getKpiData(chartConfig) : defaultKpiData;

	return (
		<main className='min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100'>
			{/* Hero Section with KPI Cards */}
			<div className='relative overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-blue-500 opacity-90' />
				<div className='bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] absolute inset-0 opacity-20' />
				<div className='relative mx-auto max-w-7xl px-4 py-16 sm:px-6'>
					<div className='flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between'>
						<div>
							<h1 className='text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl'>
								Workspace
							</h1>
							<p className='mt-4 text-lg text-white/90 sm:text-xl'>
								Your active insights and analytics dashboard
							</p>
						</div>
						<div className='md: flex h-11 w-full items-center justify-start gap-4 sm:h-12.5 sm:gap-6 md:justify-end'>
							<Suspense fallback={null}>
								<WorkspaceTabs />
							</Suspense>
							<FilterPanel
								trigger={
									<button
										aria-label='Open filters panel'
										className='ie-button-hover ie-touch-target flex h-full items-center justify-center rounded-lg border border-white/20 bg-white/10 px-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20 sm:justify-between sm:gap-2 sm:px-3'
									>
										<ListFilter size={15} />
										<span className='tablet:inline hidden'>
											Filters
										</span>
									</button>
								}
							/>
						</div>
					</div>

					{/* KPI Cards Section */}
					<div className='mt-16'>
						<div className='grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4'>
							<KpiCard
								title={kpiData.netSales.title}
								value={kpiData.netSales.value}
								trend={kpiData.netSales.trend}
								trailing={<AIIcon />}
							/>
							<KpiCard
								title={kpiData.growthNetSales.title}
								value={kpiData.growthNetSales.value}
								trend={kpiData.growthNetSales.trend}
								trailing={<AIIcon />}
							/>
							<KpiCard
								title={kpiData.dailySales.title}
								value={kpiData.dailySales.value}
								trend={kpiData.dailySales.trend}
								trailing={<AIIcon />}
							/>
							<KpiCard
								title={kpiData.callActivityVolume.title}
								value={kpiData.callActivityVolume.value}
								trend={kpiData.callActivityVolume.trend}
								trailing={<AIIcon />}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content Section */}
			<div className='mx-auto max-w-7xl space-y-4 px-4 py-16 sm:px-6'>
				{loading ? (
					// Show skeleton loading state for all 6 sections
					<>
						<AccordionRow
							title='How is the brand performing?'
							insightsCount={6}
						>
							<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
								<ChartCardSkeleton />
								<ChartCardSkeleton />
								<ChartCardSkeleton />
								<ChartCardSkeleton />
								<ChartCardSkeleton />
								<ChartCardSkeleton />
							</div>
						</AccordionRow>
						<AccordionRow
							title='How has the revenue forecast evolved?'
							insightsCount={4}
						>
							<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
								<ChartCardSkeleton />
								<ChartCardSkeleton />
								<ChartCardSkeleton />
								<ChartCardSkeleton />
							</div>
						</AccordionRow>
						<AccordionRow
							title='How are HCP and Caregiver attitudes impacting the business?'
							insightsCount={3}
						>
							<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
								<ChartCardSkeleton />
								<ChartCardSkeleton />
								<ChartCardSkeleton />
							</div>
						</AccordionRow>
						<AccordionRow
							title='How have shifts in political sentiments and policy impacted health of the business?'
							insightsCount={2}
						>
							<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
								<ChartCardSkeleton />
								<ChartCardSkeleton />
							</div>
						</AccordionRow>
						<AccordionRow
							title='How is the series completion and adherence evolving?'
							insightsCount={3}
						>
							<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
								<ChartCardSkeleton />
								<ChartCardSkeleton />
								<ChartCardSkeleton />
							</div>
						</AccordionRow>
						<AccordionRow
							title='What are the key operational metrics?'
							insightsCount={4}
						>
							<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
								<ChartCardSkeleton />
								<ChartCardSkeleton />
								<ChartCardSkeleton />
								<ChartCardSkeleton />
							</div>
						</AccordionRow>
					</>
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
					// Show actual charts when data is loaded
					chartConfig.pageLayouts.workspace.sections.map(
						(section, sectionIndex) => {
							const charts = getChartsForSection(
								chartConfig,
								'workspace',
								sectionIndex
							);

							return (
								<AccordionRow
									key={sectionIndex}
									title={section.title}
									insightsCount={section.insightsCount}
								>
									<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
										{charts.map((chart, chartIndex) => {
											const chartOption =
												transformChartData(chart);
											return (
												<ChartCard
													key={`${chart.id}-${chartIndex}`}
													title={chart.title}
													option={chartOption}
													recommended={
														chart.recommended
													}
													source='Source: Vaccelerator (FCT_CUST_FINANCE) Sep 2025'
												/>
											);
										})}
									</div>
								</AccordionRow>
							);
						}
					)
				) : null}
			</div>
		</main>
	);
}
