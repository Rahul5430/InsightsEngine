'use client';

import type { EChartsOption } from 'echarts';
import { ChevronLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { ChartCard } from '@/components/workspace/ChartCard';

export default function AddToCollectionStep() {
	const router = useRouter();

	const [selected, setSelected] = useState<Set<number>>(new Set());

	const lineOption: EChartsOption = useMemo(
		() => ({
			grid: { left: 48, right: 10, top: 30, bottom: 40 },
			legend: { top: 0, data: ['Budget Target', 'Forecast'] },
			xAxis: {
				type: 'category',
				data: ["Sep '25", "Oct '25", "Nov '25", "Dec '25"],
			},
			yAxis: { type: 'value' },
			series: [
				{
					name: 'Budget Target',
					type: 'line',
					data: [260, 300, 340, 360],
					itemStyle: { color: 'var(--ie-chart-green)' },
				},
				{
					name: 'Forecast',
					type: 'line',
					data: [230, 280, 320, 350],
					itemStyle: { color: 'var(--ie-primary)' },
				},
			],
		}),
		[]
	);

	const barOption: EChartsOption = useMemo(
		() => ({
			grid: { left: 55, right: 10, top: 30, bottom: 40 },
			xAxis: {
				type: 'category',
				data: ['ACT 25', 'Community', 'Top 40', 'Academic'],
			},
			yAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
			series: [
				{
					type: 'bar',
					data: [18, 12, 7, 6],
					itemStyle: { color: 'var(--ie-primary)' },
					barMaxWidth: 28,
				},
			],
		}),
		[]
	);

	const waterfallOption: EChartsOption = useMemo(
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
					data: [9, -4, -6, 3, 9],
					itemStyle: { color: 'var(--ie-primary)' },
					barMaxWidth: 26,
				},
			],
		}),
		[]
	);

	return (
		<main className='ie-hide-fab min-h-screen'>
			{/* Header persists with navbar since this is a full route */}
			<div className='w-full px-6 py-4'>
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

			<div className='w-full px-6 pb-24'>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
					{[
						{ title: 'Need to meet', opt: lineOption },
						{ title: 'Revenue vs forecast', opt: lineOption },
						{
							title: 'LE revenue change v/s baseline',
							opt: waterfallOption,
						},
						{
							title: 'Regional variation in ADC+IO adoption volume',
							opt: barOption,
						},
						{
							title: 'ADC+IO utilization across key account segments',
							opt: barOption,
						},
						{
							title: 'ADC+IO utilization across key account segments',
							opt: barOption,
						},
						{
							title: 'ADC+IO utilization across key account segments',
							opt: barOption,
						},
						{
							title: 'ADC+IO utilization across key account segments',
							opt: barOption,
						},
					].map((c, idx) => (
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
							className={`cursor-pointer rounded-[16px] text-left transition-all duration-200 ease-out ${
								selected.has(idx)
									? 'scale-[1.02] shadow-lg ring-2 ring-blue-500 ring-offset-2'
									: 'hover:scale-[1.01] hover:shadow-md hover:ring-1 hover:ring-slate-300'
							}`}
						>
							<ChartCard
								title={c.title}
								option={c.opt}
								interactive={false}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Sticky footer */}
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
					{selected.size === 0
						? 'Add Insight'
						: `Add Insight${selected.size > 1 ? 's' : ''} ${selected.size}`}
				</button>
			</div>
		</main>
	);
}
