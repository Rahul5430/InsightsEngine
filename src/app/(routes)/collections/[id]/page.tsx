'use client';

import type { EChartsOption } from 'echarts';
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
import { useMemo } from 'react';

import { EditCollectionModal } from '@/components/collections/EditCollectionModal';
import { ChartCard } from '@/components/workspace/ChartCard';

export default function CollectionPage() {
	// Chart options for the collection
	const needToMeetOption: EChartsOption = useMemo(
		() => ({
			grid: { left: 50, right: 10, top: 30, bottom: 40 },
			legend: { top: 0, data: ['Budget Target', 'Forecast'] },
			xAxis: {
				type: 'category',
				data: ["Sep '25", "Oct '25", "Nov '25", "Dec '25"],
			},
			yAxis: { type: 'value', axisLabel: { formatter: '{value}' } },
			series: [
				{
					name: 'Budget Target',
					type: 'line',
					data: [120, 220, 300, 340],
					itemStyle: { color: 'var(--ie-chart-green)' },
				},
				{
					name: 'Forecast',
					type: 'line',
					data: [260, 380, 400, 560],
					itemStyle: { color: 'var(--ie-primary)' },
				},
			],
		}),
		[]
	);

	const revenueVsForecastOption: EChartsOption = useMemo(
		() => ({
			grid: { left: 50, right: 10, top: 30, bottom: 40 },
			legend: { top: 0, data: ['Actuals', 'Forecast'] },
			xAxis: {
				type: 'category',
				data: ['W1', 'W2', 'W3', 'W4'],
			},
			yAxis: { type: 'value', axisLabel: { formatter: '{value}' } },
			series: [
				{
					name: 'Actuals',
					type: 'line',
					data: [8.5, 12.3, 15.7, 18.2],
					itemStyle: { color: 'var(--ie-chart-green)' },
				},
				{
					name: 'Forecast',
					type: 'line',
					data: [10.2, 13.8, 16.1, 19.5],
					itemStyle: { color: 'var(--ie-primary)' },
				},
			],
		}),
		[]
	);

	const leRevenueChangeOption: EChartsOption = useMemo(
		() => ({
			grid: { left: 55, right: 10, top: 30, bottom: 40 },
			xAxis: {
				type: 'category',
				data: ['Baseline', 'EPI', 'Share', 'Mayo Clinic', 'Current'],
			},
			yAxis: { type: 'value' },
			series: [
				{
					type: 'bar',
					data: [669, 5, -15, 31, 691],
					itemStyle: { color: 'var(--ie-primary)' },
					barMaxWidth: 26,
				},
			],
		}),
		[]
	);

	return (
		<main className='min-h-screen'>
			<div className='mx-auto max-w-6xl px-6 py-4'>
				{/* Header */}
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<Link
							href='/collections'
							className='grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[color:var(--ie-border)] bg-white text-[color:var(--ie-text)] hover:bg-[color:var(--ie-surface-muted)]'
							aria-label='Back'
						>
							<ChevronLeft size={16} />
						</Link>
						<div>
							<div className='flex items-center gap-2'>
								<h1 className='text-xl font-semibold text-[color:var(--ie-text)]'>
									My Custom Collection
								</h1>
								<EditCollectionModal
									trigger={
										<button
											className='grid h-7 w-7 cursor-pointer place-items-center rounded-full border border-[color:var(--ie-border)] bg-white hover:bg-[color:var(--ie-surface-muted)]'
											aria-label='Rename'
										>
											<Edit3 size={14} />
										</button>
									}
								/>
							</div>
							<div className='mt-1 inline-flex items-center rounded-full bg-[color:var(--ie-surface-muted)] px-2 py-0.5 text-xs text-[color:var(--ie-text-muted)]'>
								3 Insights
							</div>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<button
							className='cursor-pointer rounded-full p-2 text-[color:var(--ie-text-muted)] hover:bg-[color:var(--ie-badge-bg)]'
							aria-label='Expand'
						>
							<Expand size={16} />
						</button>
						<button
							className='cursor-pointer rounded-full p-2 text-[color:var(--ie-text-muted)] hover:bg-[color:var(--ie-badge-bg)]'
							aria-label='Favorite'
						>
							<Star size={16} />
						</button>
						<button
							className='cursor-pointer rounded-full p-2 text-[color:var(--ie-text-muted)] hover:bg-[color:var(--ie-badge-bg)]'
							aria-label='Filter'
						>
							<SlidersHorizontal size={16} />
						</button>
						<button
							className='cursor-pointer rounded-full p-2 text-[color:var(--ie-text-muted)] hover:bg-[color:var(--ie-badge-bg)]'
							aria-label='More'
						>
							<Ellipsis size={16} />
						</button>
					</div>
				</div>

				{/* Chart Cards Grid */}
				<div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
					<ChartCard
						title='Need to meet'
						option={needToMeetOption}
						recommended={true}
						source="LE2 Forecast (APS 3.0), IQVIA DDD (YTD Jul'25)"
					/>
					<ChartCard
						title='Revenue vs forecast'
						option={revenueVsForecastOption}
						recommended={true}
						source="LE2 Forecast (APS 3.0), IQVIA DDD (YTD Jul'25)"
					/>
					<ChartCard
						title='LE revenue change v/s baseline'
						option={leRevenueChangeOption}
						recommended={true}
						source='Epidemiology source (MAT 2025), Pfizer Internal data'
					/>
					{/* Empty Canvas */}
					<div className='mx-auto flex w-full flex-col items-center justify-center rounded-[14px] border border-dashed border-[color:var(--ie-border)] bg-[color:var(--ie-badge-bg)]/40 py-38 text-center'>
						<div className='text-lg font-medium text-[color:var(--ie-text)]'>
							Start adding to your collection!
						</div>
						<Link
							href='/collections/create/add'
							className='mt-4 inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-[color:var(--ie-primary)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--ie-primary)] hover:bg-[color:var(--ie-surface-muted)]'
						>
							<Plus size={16} /> Add to Collection
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
