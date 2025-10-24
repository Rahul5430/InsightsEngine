'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, X } from 'lucide-react';
import { ReactNode } from 'react';

type Props = {
	trigger: ReactNode;
};

export function FilterPanel({ trigger }: Props) {
	return (
		<Dialog.Root modal>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='ie-overlay fixed inset-0 z-40 bg-black/40' />
				<Dialog.Content className='ie-sheet fixed top-0 right-0 z-50 flex h-full w-[440px] max-w-[90vw] flex-col rounded-l-[16px] border-l border-slate-200 bg-white shadow-xl'>
					<div className='sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4'>
						<Dialog.Title className='text-xl font-semibold text-slate-900'>
							Filters
						</Dialog.Title>
						<Dialog.Close asChild>
							<button
								aria-label='Close'
								className='grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-slate-200 hover:bg-slate-100'
							>
								<X size={18} />
							</button>
						</Dialog.Close>
					</div>

					<div className='flex-1 space-y-5 overflow-y-auto px-6 py-4'>
						<div>
							<div className='mb-2 text-sm font-semibold text-slate-900'>
								Timeframe
							</div>
							<button
								aria-label='Choose timeframe option'
								className='flex w-full items-center justify-between rounded-[12px] border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-500 hover:border-slate-800'
							>
								<span>Choose an option..</span>
								<ChevronDown
									size={16}
									className='text-slate-500'
								/>
							</button>
						</div>
						<div>
							<div className='mb-2 text-sm font-semibold text-slate-900'>
								Geography
							</div>
							<button
								aria-label='Choose geography option'
								className='flex w-full items-center justify-between rounded-[12px] border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-500 hover:border-slate-800'
							>
								<span>Choose an option..</span>
								<ChevronDown
									size={16}
									className='text-slate-500'
								/>
							</button>
						</div>
						<div>
							<div className='mb-2 text-sm font-semibold text-slate-900'>
								Filter
							</div>
							<button
								aria-label='Choose filter option'
								className='flex w-full items-center justify-between rounded-[12px] border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-500 hover:border-slate-800'
							>
								<span>Choose an option..</span>
								<ChevronDown
									size={16}
									className='text-slate-500'
								/>
							</button>
						</div>
					</div>

					<div className='mt-auto flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-3'>
						<Dialog.Close asChild>
							<button className='cursor-pointer rounded-[10px] border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 hover:border-slate-800 hover:text-slate-800'>
								Cancel
							</button>
						</Dialog.Close>
						<Dialog.Close asChild>
							<button className='cursor-pointer rounded-[10px] px-4 py-2 text-sm'>
								Apply
							</button>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
