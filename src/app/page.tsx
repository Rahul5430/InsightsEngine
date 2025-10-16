import Link from 'next/link';

import { AIIcon } from '@/components/common/AIIcon';
import { NewInsightsBadge } from '@/components/common/NewInsightsBadge';
import { AlertRow } from '@/components/home/AlertRow';
import { KpiCard } from '@/components/home/KpiCard';

export default function Home() {
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
					<div className='text-center text-[28px] font-semibold tracking-tight text-white'>
						Hi Rob, here’s what’s new in your insights world today.
					</div>
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
								value='3,004 std.'
								trend='↑ 5% in total volume'
								trailing={<AIIcon />}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='mx-auto max-w-6xl px-6 pt-6'>
				<div className='py-4 text-xl font-semibold text-[color:var(--ie-text)]'>
					<span>Alerts</span>
					<span className='mx-2 text-[color:var(--ie-text-muted)]'>
						|
					</span>
					<span>Workspace</span>
					<NewInsightsBadge
						count={'+ 8'}
						className='align-middle text-sm'
					/>
					<Link
						href='/workspace'
						className='float-right text-sm text-[color:var(--ie-primary)]'
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

				<div className='mt-10 py-4 text-xl font-semibold text-[color:var(--ie-text)]'>
					<span>Alerts</span>
					<span className='mx-2 text-[color:var(--ie-text-muted)]'>
						|
					</span>
					<span>Collections</span>
					<NewInsightsBadge
						count={'+ 7'}
						className='align-middle text-sm'
					/>
					<Link
						href='/collections'
						className='float-right text-sm text-[color:var(--ie-primary)]'
					>
						View →
					</Link>
				</div>
				<div className='mb-24 space-y-4'>
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
