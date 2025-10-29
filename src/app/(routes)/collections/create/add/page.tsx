'use client';

import { ChevronLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ChartCard as CommonChartCard } from '@/components/common/ChartCard';

export default function AddToCollectionStep() {
	const router = useRouter();
	const [selected, setSelected] = useState<Set<number>>(new Set());

	const chartData = [
		{
			id: 'line-chart-1',
			title: 'Budget Target vs. Forecast',
			type: 'line',
			xAxisField: 'Month',
			yAxisField: 'Value',
			seriesField: 'SeriesName', // Used to split the data into multiple lines
			data: [
				{
					Month: "Sep '25",
					SeriesName: 'Budget Target',
					Value: 260,
					Color: 'var(--ie-chart-green)',
				},
				{
					Month: "Oct '25",
					SeriesName: 'Budget Target',
					Value: 300,
					Color: 'var(--ie-chart-green)',
				},
				{
					Month: "Nov '25",
					SeriesName: 'Budget Target',
					Value: 340,
					Color: 'var(--ie-chart-green)',
				},
				{
					Month: "Dec '25",
					SeriesName: 'Budget Target',
					Value: 360,
					Color: 'var(--ie-chart-green)',
				},

				{
					Month: "Sep '25",
					SeriesName: 'Forecast',
					Value: 230,
					Color: 'var(--ie-primary)',
				},
				{
					Month: "Oct '25",
					SeriesName: 'Forecast',
					Value: 280,
					Color: 'var(--ie-primary)',
				},
				{
					Month: "Nov '25",
					SeriesName: 'Forecast',
					Value: 320,
					Color: 'var(--ie-primary)',
				},
				{
					Month: "Dec '25",
					SeriesName: 'Forecast',
					Value: 350,
					Color: 'var(--ie-primary)',
				},
			],
		},
		{
			id: 'bar-chart-1',
			title: 'Category Performance',
			type: 'bar',
			xAxisField: 'Category',
			yAxisField: 'Percentage',
			yAxisUnit: '%', // from yAxis.axisLabel.formatter: '{value}%'
			data: [
				{
					Category: 'ACT 25',
					Percentage: 18,
					Color: 'var(--ie-primary)',
				},
				{
					Category: 'Community',
					Percentage: 12,
					Color: 'var(--ie-primary)',
				},
				{
					Category: 'Top 40',
					Percentage: 7,
					Color: 'var(--ie-primary)',
				},
				{
					Category: 'Academic',
					Percentage: 6,
					Color: 'var(--ie-primary)',
				},
			],
		},
		{
			id: 'waterfall-chart-1',
			title: 'Waterfall Analysis',
			type: 'waterfall', // Assumes your system has a way to render a waterfall from this data type
			xAxisField: 'Step',
			yAxisField: 'Change',
			data: [
				{ Step: 'Baseline', Change: 9, Color: 'var(--ie-primary)' },
				{ Step: 'EPI', Change: -4, Color: 'var(--ie-primary)' },
				{ Step: 'Share', Change: -6, Color: 'var(--ie-primary)' },
				{ Step: 'Mayo Clinic', Change: 3, Color: 'var(--ie-primary)' },
				{ Step: 'Current', Change: 9, Color: 'var(--ie-primary)' },
			],
		},
	];

	// Get available charts for selection
	const availableCharts = [
		{ id: 'needToMeet', title: 'Need to meet', opt: chartData[0] },
		{
			id: 'revenueVsForecast',
			title: 'Revenue vs forecast',
			opt: chartData[0],
		},
		{
			id: 'leRevenueChangeBaseline',
			title: 'LE revenue change v/s baseline',
			opt: chartData[2],
		},
		{
			id: 'postcardRecallRate',
			title: 'Regional variation in ADC+IO adoption volume',
			opt: chartData[1],
		},
		{
			id: 'wellnessVisitGrowth',
			title: 'ADC+IO utilization across key account segments',
			opt: chartData[1],
		},
		{
			id: 'marketShareRegions',
			title: 'ADC+IO utilization across key account segments',
			opt: chartData[1],
		},
		{
			id: 'qoqMarketShareChangeMixed',
			title: 'ADC+IO utilization across key account segments',
			opt: chartData[1],
		},
		{
			id: 'vaxneuvanceShareRegions',
			title: 'ADC+IO utilization across key account segments',
			opt: chartData[1],
		},
	];

	return (
		<main className='ie-hide-fab'>
			<div className='w-full px-16 py-8'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<Link
							href='/collections/create'
							className='grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white hover:bg-slate-100'
							aria-label='Back'
						>
							<ChevronLeft size={16} />
						</Link>
						<h2 className='text-xl font-semibold text-slate-900'>
							Add to Collection
						</h2>
					</div>
					<div className='relative hidden w-[420px] items-center md:flex'>
						<span className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500'>
							<Search size={16} />
						</span>
						<input
							placeholder='Search for insights...'
							className='w-full rounded-[9999px] border border-slate-200 bg-white py-2 pr-3 pl-9 text-sm outline-none focus:border-slate-800'
						/>
					</div>
				</div>
			</div>

			<div className='tablet:mx-4 mx-auto px-4 pb-8 sm:px-6 lg:mx-10'>
				<div className='tablet:grid-cols-2 grid grid-cols-1 gap-4 min-[1400px]:!grid-cols-3 sm:gap-6'>
					{availableCharts.map((chart, idx) => {
						const chartData = chart.opt;

						if (!chartData) return null;

						return (
							<div
								key={idx}
								onClick={() => {
									setSelected((prev) => {
										const newSet = new Set(prev);
										if (newSet.has(idx)) {
											newSet.delete(idx);
										} else {
											newSet.add(idx);
										}
										return newSet;
									});
								}}
								role='button'
								tabIndex={0}
								aria-pressed={selected.has(idx)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										setSelected((prev) => {
											const newSet = new Set(prev);
											if (newSet.has(idx)) {
												newSet.delete(idx);
											} else {
												newSet.add(idx);
											}
											return newSet;
										});
									}
								}}
								className={`cursor-pointer text-left transition-transform duration-200 ease-out ${
									selected.has(idx)
										? 'scale-[1.02]'
										: 'hover:scale-[1.01]'
								}`}
							>
								<CommonChartCard
									variant='chart'
									title={chart.title}
									interactive={false}
									selected={selected.has(idx)}
									// @ts-expect-error TODO: remove this
									chartData={chartData}
								/>
							</div>
						);
					})}
				</div>
			</div>

			<div className='sticky bottom-0 z-10 flex w-full items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-3 pr-28'>
				<Link
					href='/collections/create'
					className='rounded-[10px] border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 hover:border-slate-800 hover:text-slate-800'
				>
					Cancel
				</Link>
				<button
					disabled={selected.size === 0}
					onClick={() =>
						selected.size > 0 &&
						router.push('/collections/my-custom-collection')
					}
					className={`rounded-[10px] px-4 py-2 text-sm font-medium ${selected.size === 0 ? 'bg-border cursor-not-allowed bg-blue-300 text-white' : 'bg-primary hover:bg-primary-light cursor-pointer text-white'}`}
				>
					{selected.size === 0 ? (
						'Add Insight'
					) : (
						<>
							{`Add Insight${selected.size > 1 ? 's' : ''}`}
							<span className='ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-blue-600'>
								{selected.size}
							</span>
						</>
					)}
				</button>
			</div>
		</main>
	);
}
