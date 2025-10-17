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

import { CollectionCard } from '@/components/collections/CollectionCard';
import { CollectionsTabs } from '@/components/collections/CollectionsTabs';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { ChartCard } from '@/components/workspace/ChartCard';

// Register map/geo renderer parts required for USA map
echarts.use([
	MapChart,
	GeoComponent,
	TooltipComponent,
	LegendComponent,
	CanvasRenderer,
]);

// Reuse/select a subset of chart options seen in Workspace for demo
const needToMeetOption: EChartsOption = {
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
};

const postcardRecallOption: EChartsOption = {
	grid: { left: 45, right: 10, top: 35, bottom: 35 },
	legend: {
		top: 0,
		data: ['Ped 3m-2y MD', 'Ped 3m-2y WV', 'Ped 24-55 MD', 'Ped 5-18MD'],
	},
	xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
	yAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
	series: [
		{
			name: 'Ped 3m-2y MD',
			type: 'bar',
			data: [88, 90, 85, 80, 76],
			itemStyle: { color: 'var(--ie-primary)' },
			barMaxWidth: 24,
		},
		{
			name: 'Ped 3m-2y WV',
			type: 'bar',
			data: [24, 22, 26, 25, 27],
			itemStyle: { color: 'var(--ie-chart-orange)' },
			barMaxWidth: 24,
		},
		{
			name: 'Ped 24-55 MD',
			type: 'bar',
			data: [6, 6, 8, 7, 5],
			itemStyle: { color: 'var(--ie-chart-green)' },
			barMaxWidth: 24,
		},
		{
			name: 'Ped 5-18MD',
			type: 'bar',
			data: [0.5, 0.8, 1.0, 0.9, 0.7],
			itemStyle: { color: 'var(--ie-chart-gray)' },
			barMaxWidth: 24,
		},
	],
};

const wellnessVisitGrowthOption: EChartsOption = {
	grid: { left: 50, right: 10, top: 35, bottom: 45 },
	legend: { top: 0, data: ['Ped 3m-2y MD', 'Ped 3m-2y WV', 'Ped ≤18 MD'] },
	xAxis: { type: 'category', data: ['2022', '2023', '2024', 'MAT 2025'] },
	yAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
	series: [
		{
			name: 'Ped 3m-2y MD',
			type: 'line',
			data: [64, 66, 67, 72],
			itemStyle: { color: 'var(--ie-primary)' },
		},
		{
			name: 'Ped 3m-2y WV',
			type: 'line',
			data: [20, 24, 28, 26],
			itemStyle: { color: 'var(--ie-chart-orange)' },
		},
		{
			name: 'Ped ≤18 MD',
			type: 'line',
			data: [8, 9, 11, 7],
			itemStyle: { color: 'var(--ie-chart-teal)' },
		},
	],
};

const usaMapOption: EChartsOption = {
	tooltip: { trigger: 'item' },
	visualMap: {
		left: 0,
		min: 0,
		max: 100,
		inRange: { color: ['var(--ie-chart-light-gray)', 'var(--ie-primary)'] },
	},
	geo: { map: 'USA', roam: false },
	series: [
		{
			type: 'map',
			map: 'USA',
			data: [
				{ name: 'California', value: 85 },
				{ name: 'Texas', value: 72 },
				{ name: 'New York', value: 64 },
				{ name: 'Florida', value: 58 },
				{ name: 'Washington', value: 67 },
			],
		},
	],
};

const msRegionsOption: EChartsOption = {
	grid: { left: 36, right: 10, top: 30, bottom: 30 },
	xAxis: {
		type: 'category',
		data: [
			'Nation',
			'Northeast',
			'Southeast',
			'West',
			'South Central',
			'Greater',
		],
	},
	yAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
	series: [
		{
			type: 'bar',
			data: [94, 96, 91, 90, 68, 81],
			itemStyle: { color: 'var(--ie-primary)' },
			barMaxWidth: 30,
			label: { show: true, position: 'top', formatter: '{c}%' },
		},
	],
};

const msChangeMovableOption: EChartsOption = {
	grid: { left: 36, right: 10, top: 30, bottom: 30 },
	xAxis: {
		type: 'category',
		data: [
			'Merch Entrenched',
			'Mid',
			'North',
			'Great Lakes',
			'South',
			'West',
		],
	},
	yAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
	series: [
		{
			type: 'bar',
			data: [5, 11, 9, 6, 3, 2],
			itemStyle: { color: 'var(--ie-chart-purple)' },
			barMaxWidth: 30,
		},
	],
};

export default function CollectionsPage({
	searchParams,
}: {
	searchParams?: Record<string, string | string[] | undefined>;
}) {
	const current = (searchParams?.c as string) || 'favorites';

	return (
		<main className='min-h-screen'>
			<div
				className='w-full py-6'
				style={{
					background:
						'linear-gradient(90deg, var(--ie-nav), var(--ie-nav-end))',
				}}
			>
				<div className='mx-auto max-w-6xl px-6'>
					<div className='flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6'>
						<div className='flex items-center justify-between py-3'>
							<h1 className='text-3xl font-semibold text-white'>
								Collections
							</h1>
						</div>
						<div className='flex w-full flex-1 items-center justify-between gap-6 sm:w-auto'>
							<div className='w-full md:w-auto'>
								<CollectionsTabs />
							</div>
							<FilterPanel
								trigger={
									<button className='flex cursor-pointer flex-row items-center justify-center gap-2 text-sm text-white/95 hover:text-white'>
										<ListFilter size={14} /> Filter
									</button>
								}
							/>
							<Link
								href='/collections/create'
								className='ml-auto hidden items-center gap-2 rounded-[10px] bg-[color:var(--ie-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[color:var(--ie-primary-hover)] md:inline-flex'
							>
								<Plus size={16} /> Create Collection
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className='mx-auto max-w-6xl space-y-4 px-6 py-8'>
				{current === 'collections' ? (
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
						<CollectionCard
							title='How is the brand growing?'
							option={usaMapOption}
							newCount={2}
						/>
						<CollectionCard
							title='Weekly Tactics Collection'
							option={{
								grid: {
									left: 50,
									right: 10,
									top: 20,
									bottom: 40,
								},
								xAxis: {
									type: 'category',
									data: [
										'Texas Oncology',
										'RMCC',
										'FCS',
										'Mayo Clinic',
									],
								},
								yAxis: {
									type: 'value',
									axisLabel: { formatter: '{value}%' },
								},
								series: [
									{
										type: 'bar',
										data: [67, 36, 31, 29],
										itemStyle: {
											color: 'var(--ie-primary)',
										},
										barMaxWidth: 30,
									},
								],
							}}
							newCount={2}
						/>
						<CollectionCard
							title='Quarterly Business Review'
							option={needToMeetOption}
							newCount={2}
						/>
						<CollectionCard
							title='Competitor Watch'
							option={{
								grid: {
									left: 45,
									right: 10,
									top: 25,
									bottom: 40,
								},
								legend: {
									top: 0,
									data: [
										'Merch Entrenched',
										'Neutral Evaluators',
										'Pfizer Enthused',
									],
								},
								xAxis: {
									type: 'category',
									data: [
										'Rock.',
										'Mid.',
										'North',
										'Great',
										'South',
									],
								},
								yAxis: {
									type: 'value',
									axisLabel: { formatter: '{value}%' },
								},
								series: [
									{
										name: 'Merch Entrenched',
										type: 'bar',
										stack: 's',
										data: [5, 11, 9, 6, 3],
										itemStyle: {
											color: 'var(--ie-chart-orange)',
										},
									},
									{
										name: 'Neutral Evaluators',
										type: 'bar',
										stack: 's',
										data: [0, 0, 2, 1, 0],
										itemStyle: {
											color: 'var(--ie-chart-purple)',
										},
									},
									{
										name: 'Pfizer Enthused',
										type: 'bar',
										stack: 's',
										data: [0, 0, 0, 0, 0],
										itemStyle: {
											color: 'var(--ie-chart-blue)',
										},
									},
								],
							}}
							newCount={3}
						/>
						<CollectionCard
							title='Market Share Collection'
							option={msRegionsOption}
						/>
						<CollectionCard
							title='My Custom Collection'
							option={{
								grid: {
									left: 50,
									right: 10,
									top: 20,
									bottom: 50,
								},
								legend: {
									top: 0,
									data: ['Brand Share', 'Class Share'],
								},
								xAxis: {
									type: 'category',
									data: ['Q1', 'Q2', 'Q3', 'Q4'],
								},
								yAxis: { type: 'value' },
								series: [
									{
										name: 'Brand Share',
										type: 'line',
										data: [6, 9, 7, 11],
										itemStyle: {
											color: 'var(--ie-primary)',
										},
										smooth: true,
									},
									{
										name: 'Class Share',
										type: 'line',
										data: [2, 3, 4, 6],
										itemStyle: {
											color: 'var(--ie-chart-teal)',
										},
										smooth: true,
									},
								],
							}}
						/>
					</div>
				) : (
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
						{/* Favorites/Reports placeholder: reuse charts for now */}
						<ChartCard
							title='Need to meet'
							option={needToMeetOption}
							recommended
							source='Source: LE2 Forecast (APS 3.0), IQVIA DDD (YTD Jul’25)'
						/>
						<ChartCard
							title='Postcard Recall Rate'
							option={postcardRecallOption}
							recommended
							source='Source: ATU Q2’2025'
						/>
						<ChartCard
							title='Wellness visit growth'
							option={wellnessVisitGrowthOption}
							recommended
							source='Source: IQVIA LAAD 2025 Sep Feed'
						/>
						<ChartCard
							title='Prevnar Peds volume change'
							option={usaMapOption}
							source='Source: Vaccelerator (FCT_CUST_FINANCE) Sep 2025'
						/>
						<ChartCard
							title='Peds market share across regions'
							option={msRegionsOption}
							source='Source: Vaccelerator (FCT_CUST_FINANCE) Sep 2025'
						/>
						<ChartCard
							title='Growth across movable segments'
							option={msChangeMovableOption}
							source='Source: Vaccelerator (FCT_CUST_FINANCE) Sep 2025'
						/>
					</div>
				)}
			</div>
		</main>
	);
}
