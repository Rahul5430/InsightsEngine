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

import { EditCollectionModal } from '@/components/collections/EditCollectionModal';

export default function CreateCollectionPage() {
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
									Name Collection
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
								0 Insights
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

				{/* Canvas */}
				<div className='mt-6 rounded-[14px] border border-dashed border-[color:var(--ie-border)] bg-[color:var(--ie-badge-bg)]/40'>
					<div className='mx-auto flex min-h-[520px] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center'>
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
