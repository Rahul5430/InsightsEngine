import type { EChartsOption } from 'echarts';
import { ListFilter } from 'lucide-react';
import { Suspense } from 'react';

import { AIIcon } from '@/components/common/AIIcon';
import { KpiCard } from '@/components/home/KpiCard';
import { AccordionRow } from '@/components/workspace/AccordionRow';
import { ChartCard } from '@/components/workspace/ChartCard';
import { WorkspaceTabs } from '@/components/workspace/WorkspaceTabs';

const barOption: EChartsOption = {
	grid: { left: 30, right: 10, top: 20, bottom: 30 },
	xAxis: { type: 'category' as const, data: ['N', 'NE', 'SE', 'W', 'SC'] },
	yAxis: { type: 'value' as const },
	series: [
		{
			type: 'bar' as const,
			data: [94, 96, 91, 90, 81],
			itemStyle: { color: 'var(--ie-primary)' },
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
			<div className='mx-auto max-w-6xl space-y-4 pt-8'>
				<AccordionRow
					title='How is the brand performing?'
					insightsCount={3}
				>
					<div className='grid grid-cols-3 gap-4'>
						<ChartCard
							title='Market share across regions'
							option={barOption}
						/>
						<ChartCard
							title='QoQ market share change'
							option={barOption}
						/>
						<ChartCard
							title='Dollar sales growth across regions'
							option={barOption}
						/>
					</div>
				</AccordionRow>
				<AccordionRow title='How has the revenue forecast evolved?'>
					<div className='grid grid-cols-3 gap-4'>
						<ChartCard
							title='Revenue vs target'
							option={barOption}
						/>
						<ChartCard
							title='Growth by segment'
							option={barOption}
						/>
						<ChartCard title='Map by region' option={barOption} />
					</div>
				</AccordionRow>
			</div>
		</main>
	);
}
