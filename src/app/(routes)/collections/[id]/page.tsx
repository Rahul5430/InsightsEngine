'use client';

import {
	ChevronLeft,
	Edit3,
	Ellipsis,
	Expand,
	Plus,
	SlidersHorizontal,
	Star,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { EditCollectionModal } from '@/components/collections/EditCollectionModal';
import { ChartCard as CommonChartCard } from '@/components/common/ChartCard';
import {
	type ChartDataConfig,
	getChartDataById,
	loadChartData,
} from '@/lib/chart-data-transformer';

export default function CollectionPage() {
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

	if (loading) {
		return (
			<main className='min-h-screen'>
				<div className='flex min-h-screen items-center justify-center'>
					<div className='text-center'>
						<div className='mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500'></div>
						<p className='mt-4 text-slate-600'>
							Loading chart data...
						</p>
					</div>
				</div>
			</main>
		);
	}

	if (error || !chartConfig) {
		return (
			<main className='min-h-screen'>
				<div className='flex min-h-screen items-center justify-center'>
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
			</main>
		);
	}

	// Get chart data for this collection
	const needToMeetData = getChartDataById(chartConfig, 'needToMeet');
	const revenueVsForecastData = getChartDataById(
		chartConfig,
		'revenueVsForecast'
	);
	const leRevenueChangeData = getChartDataById(
		chartConfig,
		'leRevenueChangeBaseline'
	);

	// Options no longer used; Chart.js renders directly from chartData

	return (
		<main>
			<div className='tablet:mx-4 mx-auto px-4 py-4 pb-8 sm:px-6 lg:mx-10'>
				<div className='flex items-center justify-between py-4'>
					<div className='flex items-center gap-3'>
						<Link
							href='/collections'
							className='grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white text-slate-900 hover:bg-slate-100'
							aria-label='Back'
						>
							<ChevronLeft size={16} />
						</Link>
						<div>
							<div className='flex items-center gap-2'>
								<h1 className='text-xl font-semibold text-slate-900'>
									My Custom Collection
								</h1>
								<EditCollectionModal
									trigger={
										<button
											className='grid h-7 w-7 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white hover:bg-slate-100'
											aria-label='Rename'
										>
											<Edit3 size={14} />
										</button>
									}
								/>
							</div>
							<div className='mt-1 inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-700'>
								3 Insights
							</div>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<button
							className='cursor-pointer rounded-full p-2 text-slate-500 hover:bg-slate-50'
							aria-label='Expand'
						>
							<Expand size={16} />
						</button>
						<button
							className='cursor-pointer rounded-full p-2 text-slate-500 hover:bg-slate-50'
							aria-label='Favorite'
						>
							<Star size={16} />
						</button>
						<button
							className='cursor-pointer rounded-full p-2 text-slate-500 hover:bg-slate-50'
							aria-label='Filter'
						>
							<SlidersHorizontal size={16} />
						</button>
						<button
							className='cursor-pointer rounded-full p-2 text-slate-500 hover:bg-slate-50'
							aria-label='More'
						>
							<Ellipsis size={16} />
						</button>
					</div>
				</div>

				<div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
					{needToMeetData && (
						<div className='rounded-[16px] text-left transition-transform duration-200 ease-out hover:scale-[1.01]'>
							<CommonChartCard
								variant='chart'
								title='Need to meet'
								chartData={needToMeetData}
								recommended={true}
								source="LE2 Forecast (APS 3.0), IQVIA DDD (YTD Jul'25)"
							/>
						</div>
					)}
					{revenueVsForecastData && (
						<div className='rounded-[16px] text-left transition-transform duration-200 ease-out hover:scale-[1.01]'>
							<CommonChartCard
								variant='chart'
								title='Revenue vs forecast'
								chartData={revenueVsForecastData}
								recommended={true}
								source="LE2 Forecast (APS 3.0), IQVIA DDD (YTD Jul'25)"
							/>
						</div>
					)}
					{leRevenueChangeData && (
						<div className='rounded-[16px] text-left transition-transform duration-200 ease-out hover:scale-[1.01]'>
							<CommonChartCard
								variant='chart'
								title='LE revenue change v/s baseline'
								chartData={leRevenueChangeData}
								recommended={true}
								source='Epidemiology source (MAT 2025), Pfizer Internal data'
							/>
						</div>
					)}

					<div className='mx-auto flex w-full flex-col items-center justify-center rounded-[14px] border border-dashed border-slate-200 bg-slate-50/40 py-38 text-center'>
						<div className='text-lg font-medium text-slate-900'>
							Start adding to your collection!
						</div>
						<Link
							href='/collections/create/add'
							className='mt-4 inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-slate-800 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100'
						>
							<Plus size={16} /> Add to Collection
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
