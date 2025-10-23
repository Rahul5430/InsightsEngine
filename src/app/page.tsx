import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { AIIcon } from '@/components/common/AIIcon';
import { NewInsightsBadge } from '@/components/common/NewInsightsBadge';
import { AlertRow } from '@/components/home/AlertRow';
import { KpiCard } from '@/components/home/KpiCard';

export default function Home() {
	return (
		<main className='min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100'>
			{/* Hero Section with KPI Cards */}
			<div className='relative overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-blue-500 opacity-90' />
				<div className='bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] absolute inset-0 opacity-20' />

				<div className='relative mx-auto max-w-7xl px-4 py-16 sm:px-6'>
					<div className='text-center'>
						<h1 className='text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl'>
							Welcome back, Rob
						</h1>
						<p className='mt-4 text-lg text-white/90 sm:text-xl lg:text-2xl'>
							Here&apos;s what&apos;s new in your insights world
							today
						</p>
					</div>

					{/* KPI Cards Section */}
					<div className='mt-16'>
						<div className='grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4'>
							<KpiCard
								title='Net Sales'
								value='$485M'
								trend='↑ 32% YoY | 32% QoQ'
								trendColor='success'
								trailing={<AIIcon />}
							/>
							<KpiCard
								title='Growth Net Sales'
								value='$103M'
								trend='↑ 20.5%'
								trendColor='success'
								trailing={<AIIcon />}
							/>
							<KpiCard
								title='Daily Sales'
								value='3,004 std.'
								trend='↑ 5% in total volume'
								trendColor='success'
								trailing={<AIIcon />}
							/>
							<KpiCard
								title='Call Activity Volume'
								value='3,004 std.'
								trend='↑ 5% in total volume'
								trendColor='success'
								trailing={<AIIcon />}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Workspace Section */}
			<div className='mx-auto max-w-7xl px-4 pt-16 sm:px-6'>
				<div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
					<div className='flex items-center gap-3'>
						<div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500'>
							<span className='text-lg font-bold text-white'>
								W
							</span>
						</div>
						<div>
							<h2 className='text-xl font-bold text-slate-900 sm:text-2xl'>
								Workspace
							</h2>
							<p className='text-sm text-slate-500'>
								Your active insights and alerts
							</p>
						</div>
					</div>
					<div className='flex items-center gap-3'>
						<NewInsightsBadge count={'+ 8'} className='text-sm' />
						<Link
							href='/workspace'
							className='ie-button-hover ie-touch-target flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-500 hover:bg-slate-50'
						>
							View All
							<ChevronRight className='h-4 w-4' />
						</Link>
					</div>
				</div>

				<div className='space-y-4'>
					<AlertRow
						title='How is the brand performing?'
						newCount={3}
						href='/workspace'
					/>
					<AlertRow
						title='How has the revenue forecast evolved?'
						newCount={3}
						href='/workspace'
					/>
					<AlertRow
						title='How are HCP and Caregiver attitudes impacting the business?'
						newCount={2}
						href='/workspace'
					/>
				</div>
			</div>

			{/* Collections Section */}
			<div className='mx-auto max-w-7xl px-4 py-16 sm:px-6'>
				<div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
					<div className='flex items-center gap-3'>
						<div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500'>
							<span className='text-lg font-bold text-white'>
								C
							</span>
						</div>
						<div>
							<h2 className='text-xl font-bold text-slate-900 sm:text-2xl'>
								Collections
							</h2>
							<p className='text-sm text-slate-500'>
								Organized insights and reports
							</p>
						</div>
					</div>
					<div className='flex items-center gap-3'>
						<NewInsightsBadge count={'+ 7'} className='text-sm' />
						<Link
							href='/collections'
							className='ie-button-hover ie-touch-target flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-500 hover:bg-slate-50'
						>
							View All
							<ChevronRight className='h-4 w-4' />
						</Link>
					</div>
				</div>

				<div className='space-y-4'>
					<AlertRow
						title='Weekly Tactics Meeting'
						newCount={2}
						href='/collections'
					/>
					<AlertRow
						title='Quarterly Business Review'
						newCount={2}
						href='/collections'
					/>
					<AlertRow
						title='Competitor Watch'
						newCount={3}
						href='/collections'
					/>
				</div>
			</div>
		</main>
	);
}
