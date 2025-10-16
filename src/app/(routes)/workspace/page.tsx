import type { EChartsOption } from 'echarts';
import { MapChart } from 'echarts/charts';
import { GeoComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { ListFilter } from 'lucide-react';
import { Suspense } from 'react';

import { AIIcon } from '@/components/common/AIIcon';
import { KpiCard } from '@/components/home/KpiCard';
import { AccordionRow } from '@/components/workspace/AccordionRow';
import { ChartCard } from '@/components/workspace/ChartCard';
import { WorkspaceTabs } from '@/components/workspace/WorkspaceTabs';

// Chart options for six demo charts
const msRegionsOption: EChartsOption = {
	grid: { left: 36, right: 10, top: 30, bottom: 30 },
	xAxis: {
		type: 'category' as const,
		data: [
			'Nation',
			'Northeast',
			'Southeast',
			'West',
			'South Central',
			'Greater',
		],
	},
	yAxis: {
		type: 'value' as const,
		max: 100,
		axisLabel: { formatter: '{value}%' },
	},
	series: [
		{
			type: 'bar' as const,
			data: [94, 96, 91, 90, 68, 81],
			itemStyle: { color: 'var(--ie-primary)' },
			barMaxWidth: 30,
			label: { show: true, position: 'top', formatter: '{c}%' },
			markLine: {
				symbol: 'none',
				lineStyle: { type: 'dashed', color: '#22c55e' },
				data: [{ yAxis: 85 }],
			},
		},
	],
};

const msChangeMovableOption: EChartsOption = {
	grid: { left: 36, right: 10, top: 30, bottom: 30 },
	xAxis: {
		type: 'category' as const,
		data: [
			'Nation',
			'All IDN',
			'Independent',
			'Pfizer',
			'Neutral',
			'Merck',
		],
	},
	yAxis: { type: 'value' as const, axisLabel: { formatter: '{value}%' } },
	series: [
		{
			type: 'bar' as const,
			data: [0, 2, 4, 7, 18, 0],
			itemStyle: { color: 'var(--ie-primary)' },
			barMaxWidth: 30,
			markLine: {
				symbol: 'none',
				lineStyle: { type: 'dashed', color: '#22c55e' },
				data: [{ yAxis: 12 }],
			},
		},
	],
};

const vaxShareOption: EChartsOption = {
	grid: { left: 36, right: 10, top: 30, bottom: 40 },
	tooltip: { trigger: 'axis' },
	legend: { top: 0 },
	xAxis: {
		type: 'category' as const,
		data: ["Jan'25", "Mar'25", "Jun'25", "Aug'25"],
	},
	yAxis: { type: 'value' as const, axisLabel: { formatter: '{value}%' } },
	series: [
		{
			name: 'West',
			type: 'line' as const,
			data: [50, 44, 40, 36],
			itemStyle: { color: 'var(--ie-primary)' },
		},
		{
			name: 'Rocky Mountains',
			type: 'line' as const,
			data: [10, 12, 16, 14],
			itemStyle: { color: '#60a5fa' },
		},
		{
			name: 'Northeast',
			type: 'line' as const,
			data: [6, 7, 8, 11],
			itemStyle: { color: '#93c5fd' },
		},
		{
			name: 'South Central',
			type: 'line' as const,
			data: [8, 9, 10, 12],
			itemStyle: { color: '#a5b4fc' },
		},
	],
};

const qoqMixedOption: EChartsOption = {
	grid: { left: 36, right: 10, top: 30, bottom: 30 },
	xAxis: {
		type: 'category' as const,
		data: ['North', 'South', 'West', 'Southeast', 'Great Lakes', 'Midwest'],
	},
	yAxis: { type: 'value' as const, axisLabel: { formatter: '{value}%' } },
	series: [
		{
			type: 'bar' as const,
			data: [6, 7, 8, 4, -2, -1],
			itemStyle: { color: 'var(--ie-primary)' },
			barMaxWidth: 28,
			label: {
				show: true,
				position: 'top',
				formatter: '{c}%',
			},
		},
	],
	markLine: {
		symbol: 'none',
		lineStyle: { type: 'dashed', color: '#22c55e' },
		data: [{ yAxis: 10 }],
	},
};

const q4NeedOption: EChartsOption = {
	grid: { left: 48, right: 10, top: 30, bottom: 30 },
	legend: { top: 0 },
	xAxis: {
		type: 'category' as const,
		data: ['Nation', 'South', 'Northeast', 'West', 'Rockies'],
	},
	yAxis: { type: 'value' as const, name: 'Million Doses' },
	series: [
		{
			name: 'Projected',
			type: 'bar' as const,
			data: [30, 22, 14, 12, 10],
			itemStyle: { color: 'var(--ie-primary)' },
			barMaxWidth: 28,
		},
		{
			name: 'Forecast',
			type: 'bar' as const,
			data: [26, 18, 12, 9, 8],
			itemStyle: { color: '#60a5fa' },
			barMaxWidth: 28,
		},
	],
};

// Revenue forecast section charts
const leRevenueChangeOption: EChartsOption = {
	grid: { left: 40, right: 10, top: 40, bottom: 40 },
	xAxis: {
		type: 'category',
		data: ['Baseline', 'EPI', 'Share', 'Mayo Clinic', 'Current'],
	},
	yAxis: {
		type: 'value',
		name: 'Revenue ($)',
		axisLabel: { formatter: '{value}' },
		splitLine: { show: true },
	},
	series: [
		{
			type: 'bar',
			data: [669000000, 5000000, -15000000, 31000000, 691000000],
			itemStyle: { color: 'var(--ie-primary)' },
			barMaxWidth: 30,
			label: { show: true, position: 'top', formatter: '{c}' },
		},
	],
};

const needToMeetOption: EChartsOption = {
	grid: { left: 50, right: 10, top: 30, bottom: 40 },
	legend: { top: 0, data: ['Budget Target', 'Forecast'] },
	xAxis: {
		type: 'category',
		data: ["Sep '25", "Oct '25", "Nov '25", "Dec '25"],
	},
	yAxis: { type: 'value', axisLabel: { formatter: '{value}M' } },
	series: [
		{
			name: 'Budget Target',
			type: 'line',
			data: [120, 220, 300, 340],
			itemStyle: { color: '#22c55e' },
		},
		{
			name: 'Forecast',
			type: 'line',
			data: [260, 380, 400, 560],
			itemStyle: { color: 'var(--ie-primary)' },
		},
	],
};

const revenueVsForecastOption: EChartsOption = {
	grid: { left: 50, right: 10, top: 30, bottom: 40 },
	legend: { top: 0, data: ['Actuals', 'Forecast'] },
	xAxis: { type: 'category', data: ['W1', 'W2', 'W3', 'W4'] },
	yAxis: { type: 'value', axisLabel: { formatter: '{value}' } },
	series: [
		{
			name: 'Actuals',
			type: 'line',
			data: [9.5, 12.8, 15.2, 17.1],
			itemStyle: { color: 'var(--ie-primary)' },
		},
		{
			name: 'Forecast',
			type: 'line',
			data: [9.2, 11.0, 12.4, 14.0],
			itemStyle: { color: '#3b82f6' },
		},
	],
};

const q4GoalSettingOption: EChartsOption = {
	grid: { left: 60, right: 10, top: 30, bottom: 40 },
	xAxis: {
		type: 'category',
		data: ['Nation', 'South', 'Northeast', 'West', 'Rockies'],
	},
	yAxis: { type: 'value', name: 'Million Doses' },
	series: [
		{
			name: 'Forecast',
			type: 'bar',
			data: [28, 11, 10, 10, 9],
			barMaxWidth: 30,
			itemStyle: { color: '#f97316' },
		},
	],
};

// HCP and Caregiver attitudes section charts
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
			itemStyle: { color: '#f97316' },
			barMaxWidth: 24,
		},
		{
			name: 'Ped 24-55 MD',
			type: 'bar',
			data: [6, 6, 8, 7, 5],
			itemStyle: { color: '#22c55e' },
			barMaxWidth: 24,
		},
		{
			name: 'Ped 5-18MD',
			type: 'bar',
			data: [0.5, 0.8, 1.0, 0.9, 0.7],
			itemStyle: { color: '#94a3b8' },
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
			itemStyle: { color: '#f97316' },
		},
		{
			name: 'Ped ≤18 MD',
			type: 'line',
			data: [8, 9, 11, 7],
			itemStyle: { color: '#10b981' },
		},
	],
};

const wellnessByAgeOption: EChartsOption = {
	grid: { left: 65, right: 10, top: 35, bottom: 60 },
	xAxis: { type: 'category', data: ['1', '3', '5', '7', '9', '11'] },
	yAxis: {
		type: 'value',
		name: '% Patients',
		axisLabel: { formatter: '{value}%' },
	},
	series: [
		{
			type: 'bar',
			data: [97, 71, 86, 34, 86, 37],
			itemStyle: { color: 'var(--ie-primary)' },
			barMaxWidth: 28,
		},
	],
};

// Political sentiments and policy section
const birthRateOption: EChartsOption = {
	grid: { left: 55, right: 10, top: 35, bottom: 60 },
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: ['Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25', 'Jun-25'],
	},
	yAxis: {
		type: 'value',
		name: '% Live Births',
		axisLabel: { formatter: '{value}%' },
	},
	series: [
		{
			type: 'line',
			data: [8, 7, 8, 8, 8, 9],
			itemStyle: { color: 'var(--ie-primary)' },
			areaStyle: { color: 'var(--ie-primary)' },
			symbol: 'none',
			smooth: true,
		},
	],
};

const vaccinationSouthCentralOption: EChartsOption = {
	grid: { left: 55, right: 10, top: 35, bottom: 60 },
	legend: { top: 0, data: ['Vaccination Rate', 'Monthly Public Ordering'] },
	xAxis: { type: 'category', data: ['2022', '2023', '2024', '2025'] },
	yAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
	series: [
		{
			name: 'Vaccination Rate',
			type: 'line',
			data: [12, 12, 11, 10],
			itemStyle: { color: '#10b981' },
			smooth: true,
		},
		{
			name: 'Monthly Public Ordering',
			type: 'line',
			data: [80, 81, 80, 80],
			itemStyle: { color: 'var(--ie-primary)' },
			smooth: true,
		},
	],
};

echarts.use([MapChart, GeoComponent, CanvasRenderer]);
const usaMapOption: EChartsOption = {
	tooltip: { trigger: 'item' },
	visualMap: {
		left: 0,
		min: 0,
		max: 100,
		inRange: { color: ['#cfe0ff', 'var(--ie-primary)'] },
	},
	geo: { map: 'USA', roam: false },
	series: [
		{
			type: 'map' as const,
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

export default function WorkspacePage() {
	return (
		<main className='min-h-screen'>
			<div
				className='w-full py-8'
				style={{
					background:
						'linear-gradient(90deg, var(--ie-nav), var(--ie-nav-end))',
				}}
			>
				<div className='mx-auto max-w-6xl px-6'>
					<div className='flex flex-row items-center gap-6'>
						<div className='flex items-center justify-between py-3'>
							<h1 className='text-3xl font-semibold text-white'>
								Workspace
							</h1>
						</div>
						<div className='flex items-center justify-between gap-6'>
							<Suspense fallback={null}>
								<WorkspaceTabs />
							</Suspense>
							<button className='flex flex-row items-center justify-center gap-2 text-sm text-white/95 hover:text-white'>
								<ListFilter size={14} /> Filters
							</button>
						</div>
					</div>
					<div>
						<div className='mt-6 grid grid-cols-4 gap-5'>
							<div className='col-span-1'>
								<KpiCard
									title='Net Sales'
									value='$485M'
									trend='↑ 32% YoY | 32% QoQ'
									trailing={<AIIcon />}
								/>
							</div>
							<div className='col-span-1'>
								<KpiCard
									title='Growth Net Sales'
									value='$103M'
									trend='↑ 20.5%'
									trailing={<AIIcon />}
								/>
							</div>
							<div className='col-span-1'>
								<KpiCard
									title='Daily Sales'
									value='3,004 std.'
									trend='↑ 5% in total volume'
									trailing={<AIIcon />}
								/>
							</div>
							<div className='col-span-1'>
								<KpiCard
									title='Call Activity Volume'
									value='18K'
									trend='↑ 28%'
									trailing={<AIIcon />}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='mx-auto max-w-6xl space-y-4 py-8'>
				<AccordionRow
					title='How is the brand performing?'
					insightsCount={6}
				>
					<div className='grid grid-cols-3 gap-4'>
						<ChartCard
							title='Market share across regions'
							option={msRegionsOption}
							recommended
						/>
						<ChartCard
							title='% Market share change across movable segments'
							option={msChangeMovableOption}
							recommended
						/>
						<ChartCard
							title='Dollar sales growth across regions'
							option={usaMapOption}
							recommended
						/>
						<ChartCard
							title='Vaxneuvance share across regions'
							option={vaxShareOption}
						/>
						<ChartCard
							title='QoQ market share change in mixed accounts'
							option={qoqMixedOption}
						/>
						<ChartCard
							title='Q4 need to meet across region'
							option={q4NeedOption}
						/>
					</div>
				</AccordionRow>
				<AccordionRow
					title='How has the revenue forecast evolved?'
					insightsCount={4}
				>
					<div className='grid grid-cols-3 gap-4'>
						<ChartCard
							title='LE revenue change v/s baseline'
							option={leRevenueChangeOption}
							recommended
						/>
						<ChartCard
							title='Need to meet'
							option={needToMeetOption}
							recommended
						/>
						<ChartCard
							title='Revenue vs forecast'
							option={revenueVsForecastOption}
							recommended
						/>
						<ChartCard
							title='Q4 goal setting across regions'
							option={q4GoalSettingOption}
						/>
					</div>
				</AccordionRow>
				<AccordionRow
					title='How are HCP and Caregiver attitudes impacting the business?'
					insightsCount={3}
				>
					<div className='grid grid-cols-3 gap-4'>
						<ChartCard
							title='Postcard Recall Rate'
							option={postcardRecallOption}
							recommended
						/>
						<ChartCard
							title='Wellness visit growth'
							option={wellnessVisitGrowthOption}
							recommended
						/>
						<ChartCard
							title='Wellness visit by age group'
							option={wellnessByAgeOption}
						/>
					</div>
				</AccordionRow>
				<AccordionRow
					title='How have shifts in political sentiments and policy impacted health of the business?'
					insightsCount={2}
				>
					<div className='grid grid-cols-2 gap-4'>
						<ChartCard
							title='Birth rate'
							option={birthRateOption}
						/>
						<ChartCard
							title='Vaccination rate in South Central region'
							option={vaccinationSouthCentralOption}
						/>
					</div>
				</AccordionRow>
				<AccordionRow
					title='How is the series completion and adherence evolving?'
					insightsCount={3}
				>
					{/** Chart options for this row */}
					{(() => {
						const seriesCompletionOption: EChartsOption = {
							grid: { left: 50, right: 10, top: 40, bottom: 40 },
							legend: {
								top: 0,
								data: [
									'Completed Series',
									'Missed Dose 4',
									'Missed Dose 3',
									'Missed Dose 2',
									'Missed All Doses',
									'Total Births',
								],
							},
							xAxis: {
								type: 'category',
								data: ['2022', '2023', '2024', 'MAT 2025'],
							},
							yAxis: { type: 'value' },
							series: [
								{
									name: 'Completed Series',
									type: 'bar',
									data: [105, 110, 95, 100],
									itemStyle: { color: 'var(--ie-primary)' },
									barMaxWidth: 28,
								},
								{
									name: 'Missed Dose 4',
									type: 'bar',
									data: [6, 7, 8, 7],
									itemStyle: { color: '#f97316' },
									barMaxWidth: 12,
								},
								{
									name: 'Missed Dose 3',
									type: 'bar',
									data: [4, 4, 5, 4],
									itemStyle: { color: '#a78bfa' },
									barMaxWidth: 12,
								},
								{
									name: 'Missed Dose 2',
									type: 'bar',
									data: [3, 3, 3, 2],
									itemStyle: { color: '#60a5fa' },
									barMaxWidth: 12,
								},
								{
									name: 'Missed All Doses',
									type: 'bar',
									data: [2, 2, 3, 2],
									itemStyle: { color: '#94a3b8' },
									barMaxWidth: 12,
								},
								{
									name: 'Total Births',
									type: 'line',
									data: [130, 150, 170, 170],
									itemStyle: { color: '#22c55e' },
									smooth: true,
								},
							],
						};

						const missedDosesOption: EChartsOption = {
							grid: { left: 60, right: 10, top: 40, bottom: 50 },
							legend: {
								top: 0,
								data: [
									'Completed Series',
									'Missed Dose 4',
									'Missed Dose 3',
									'Missed Dose 2',
									'Total Starts',
								],
							},
							xAxis: {
								type: 'category',
								data: [
									'Total Starts',
									'Missed Dose 2',
									'Missed Dose 3',
									'Missed Dose 4',
									'Completed Series',
								],
							},
							yAxis: { type: 'value' },
							series: [
								{
									name: 'Total Starts',
									type: 'bar',
									data: [200, 0, 0, 0, 0],
									itemStyle: { color: '#16a34a' },
									barMaxWidth: 28,
								},
								{
									name: 'Missed Dose 2',
									type: 'bar',
									data: [0, 95, 0, 0, 0],
									itemStyle: { color: '#60a5fa' },
									barMaxWidth: 28,
								},
								{
									name: 'Missed Dose 3',
									type: 'bar',
									data: [0, 0, 870, 0, 0],
									itemStyle: { color: '#a78bfa' },
									barMaxWidth: 28,
								},
								{
									name: 'Missed Dose 4',
									type: 'bar',
									data: [0, 0, 0, 1011, 0],
									itemStyle: { color: '#f97316' },
									barMaxWidth: 28,
								},
								{
									name: 'Completed Series',
									type: 'bar',
									data: [0, 0, 0, 0, 1200],
									itemStyle: { color: 'var(--ie-primary)' },
									barMaxWidth: 28,
								},
							],
						};

						const pedPopulationMovementOption: EChartsOption = {
							grid: { left: 65, right: 10, top: 40, bottom: 60 },
							legend: {
								top: 0,
								data: [
									'Prevnar 13',
									'Prevnar 20',
									'Vaxneuvance',
								],
							},
							xAxis: {
								type: 'category',
								data: ['1', '2', '3', '4'],
							},
							yAxis: {
								type: 'value',
								name: 'Doses',
								axisLabel: { formatter: '{value}%' },
								max: 100,
							},
							series: [
								{
									name: 'Prevnar 13',
									type: 'bar',
									stack: 'total',
									data: [100, 93, 83, 39],
									itemStyle: { color: 'var(--ie-primary)' },
									barMaxWidth: 36,
									label: {
										show: true,
										position: 'insideTop',
										formatter: '{c}%',
									},
								},
								{
									name: 'Prevnar 20',
									type: 'bar',
									stack: 'total',
									data: [0, 0, 11, 25],
									itemStyle: { color: '#f97316' },
									label: {
										show: true,
										position: 'insideTop',
										formatter: '{c}%',
									},
								},
								{
									name: 'Vaxneuvance',
									type: 'bar',
									stack: 'total',
									data: [0, 5, 6, 22],
									itemStyle: { color: '#a78bfa' },
									label: {
										show: true,
										position: 'insideTop',
										formatter: '{c}%',
									},
								},
							],
						};

						return (
							<div className='grid grid-cols-3 gap-4'>
								<ChartCard
									title='Series Completion'
									option={seriesCompletionOption}
								/>
								<ChartCard
									title='Missed doses'
									option={missedDosesOption}
								/>
								<ChartCard
									title='PED Population movement'
									option={pedPopulationMovementOption}
								/>
							</div>
						);
					})()}
				</AccordionRow>
			</div>
		</main>
	);
}
