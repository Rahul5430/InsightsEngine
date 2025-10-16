'use client';

import type { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';

type Props = {
	title: string;
	option: EChartsOption; // echarts option object
};

export function ChartCard({ title, option }: Props) {
	return (
		<div className='rounded-[14px] border border-[color:var(--ie-border)] bg-white p-4 shadow-[var(--ie-shadow-soft)]'>
			<div className='mb-2 flex items-center justify-between'>
				<div className='text-sm font-medium text-[color:var(--ie-text)]'>
					{title}
				</div>
				<div className='text-[color:var(--ie-text-muted)]'>⋯</div>
			</div>
			<ReactECharts
				option={option}
				notMerge
				lazyUpdate
				style={{ height: 240 }}
			/>
		</div>
	);
}
