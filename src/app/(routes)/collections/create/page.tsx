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
		<main>
			<div className='tablet:mx-4 mx-auto px-4 py-4 pb-8 sm:px-6 lg:mx-10'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<Link
							href='/collections'
							className='grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white text-slate-900 hover:bg-slate-100'
							aria-label='Back'
						>
							<ChevronLeft size={16} />
						</Link>
						<div>
							<div className='flex items-center gap-2'>
								<h1 className='text-xl font-semibold text-slate-900'>
									Name Collection
								</h1>
								<EditCollectionModal
									trigger={
										<button
											className='grid h-7 w-7 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white hover:bg-slate-100'
											aria-label='Rename'
										>
											<Edit3 size={14} />
										</button>
									}
								/>
							</div>
							<div className='mt-1 inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-700'>
								0 Insights
							</div>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<button
							className='cursor-pointer rounded-full p-2 text-slate-500 hover:bg-slate-50'
							aria-label='Expand'
						>
							<Expand size={16} />
						</button>
						<button
							className='cursor-pointer rounded-full p-2 text-slate-500 hover:bg-slate-50'
							aria-label='Favorite'
						>
							<Star size={16} />
						</button>
						<button
							className='cursor-pointer rounded-full p-2 text-slate-500 hover:bg-slate-50'
							aria-label='Filter'
						>
							<SlidersHorizontal size={16} />
						</button>
						<button
							className='cursor-pointer rounded-full p-2 text-slate-500 hover:bg-slate-50'
							aria-label='More'
						>
							<Ellipsis size={16} />
						</button>
					</div>
				</div>

				<div className='mt-6 rounded-[14px] border border-dashed border-slate-200 bg-slate-50/40'>
					<div className='mx-auto flex min-h-[520px] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center'>
						<div className='text-lg font-medium text-slate-900'>
							Start adding to your collection!
						</div>
						<Link
							href='/collections/create/add'
							className='mt-4 inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-slate-800 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100'
						>
							<Plus size={16} /> Add to Collection
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
