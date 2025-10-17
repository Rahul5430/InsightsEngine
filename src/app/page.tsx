import Link from 'next/link';

import { AIIcon } from '@/components/common/AIIcon';
import { NewInsightsBadge } from '@/components/common/NewInsightsBadge';
import { AlertRow } from '@/components/home/AlertRow';
import { KpiCard } from '@/components/home/KpiCard';

export default function Home() {
	return (
		<main className='min-h-screen'>
			<div
				className='w-full py-6 sm:py-8'
				style={{
					background:
						'linear-gradient(90deg, var(--ie-nav), var(--ie-nav-end))',
				}}
			>
				<div className='mx-auto max-w-6xl px-4 sm:px-6'>
					<div className='px-2 text-center text-lg font-semibold tracking-tight text-white sm:text-2xl lg:text-[28px]'>
						Hi Rob, here&apos;s what&apos;s new in your insights
						world today.
					</div>
					<div className='mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-5 lg:grid-cols-4'>
						<KpiCard
							title='Net Sales'
							value='$485M'
							trend='↑ 32% YoY | 32% QoQ'
							trailing={<AIIcon />}
						/>
						<KpiCard
							title='Growth Net Sales'
							value='$103M'
							trend='↑ 20.5%'
							trailing={<AIIcon />}
						/>
						<KpiCard
							title='Daily Sales'
							value='3,004 std.'
							trend='↑ 5% in total volume'
							trailing={<AIIcon />}
						/>
						<KpiCard
							title='Call Activity Volume'
							value='3,004 std.'
							trend='↑ 5% in total volume'
							trailing={<AIIcon />}
						/>
					</div>
				</div>
			</div>

			<div className='mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6'>
				<div className='flex flex-wrap items-center gap-2 py-3 text-base font-semibold text-[color:var(--ie-text)] sm:py-4 sm:text-lg lg:text-xl'>
					<span>Alerts</span>
					<span className='mx-2 hidden text-[color:var(--ie-text-muted)] sm:inline'>
						|
					</span>
					<span>Workspace</span>
					<NewInsightsBadge
						count={'+ 8'}
						className='align-middle text-xs sm:text-sm'
					/>
					<Link
						href='/workspace'
						className='ml-auto text-xs text-[color:var(--ie-primary)] sm:text-sm'
					>
						View →
					</Link>
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

				<div className='mt-8 flex flex-wrap items-center gap-2 py-3 text-base font-semibold text-[color:var(--ie-text)] sm:mt-10 sm:py-4 sm:text-lg lg:text-xl'>
					<span>Alerts</span>
					<span className='mx-2 hidden text-[color:var(--ie-text-muted)] sm:inline'>
						|
					</span>
					<span>Collections</span>
					<NewInsightsBadge
						count={'+ 7'}
						className='align-middle text-xs sm:text-sm'
					/>
					<Link
						href='/collections'
						className='ml-auto text-xs text-[color:var(--ie-primary)] sm:text-sm'
					>
						View →
					</Link>
				</div>
				<div className='mb-16 space-y-3 sm:mb-24 sm:space-y-4'>
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
