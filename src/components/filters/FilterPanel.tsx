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
				<Dialog.Content className='ie-sheet fixed top-0 right-0 z-50 flex h-full w-[440px] max-w-[90vw] flex-col rounded-l-[16px] border-l border-[color:var(--ie-border)] bg-white shadow-xl'>
					<div className='sticky top-0 z-10 flex items-center justify-between border-b border-[color:var(--ie-border)] bg-white px-6 py-4'>
						<Dialog.Title className='text-xl font-semibold text-[color:var(--ie-text)]'>
							Filters
						</Dialog.Title>
						<Dialog.Close asChild>
							<button
								aria-label='Close'
								className='grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[color:var(--ie-border)] hover:bg-[color:var(--ie-surface-muted)]'
							>
								<X size={18} />
							</button>
						</Dialog.Close>
					</div>

					<div className='flex-1 space-y-5 overflow-y-auto px-6 py-4'>
						<div>
							<div className='mb-2 text-sm font-semibold text-[color:var(--ie-text)]'>
								Timeframe
							</div>
							<button className='flex w-full items-center justify-between rounded-[12px] border border-[color:var(--ie-border)] bg-[color:var(--ie-surface)] px-4 py-3 text-left text-sm text-[color:var(--ie-text-muted)] hover:border-[color:var(--ie-primary)]'>
								<span>Choose an option..</span>
								<ChevronDown
									size={16}
									className='text-[color:var(--ie-text-muted)]'
								/>
							</button>
						</div>
						<div>
							<div className='mb-2 text-sm font-semibold text-[color:var(--ie-text)]'>
								Geography
							</div>
							<button className='flex w-full items-center justify-between rounded-[12px] border border-[color:var(--ie-border)] bg-[color:var(--ie-surface)] px-4 py-3 text-left text-sm text-[color:var(--ie-text-muted)] hover:border-[color:var(--ie-primary)]'>
								<span>Choose an option..</span>
								<ChevronDown
									size={16}
									className='text-[color:var(--ie-text-muted)]'
								/>
							</button>
						</div>
						<div>
							<div className='mb-2 text-sm font-semibold text-[color:var(--ie-text)]'>
								Filter
							</div>
							<button className='flex w-full items-center justify-between rounded-[12px] border border-[color:var(--ie-border)] bg-[color:var(--ie-surface)] px-4 py-3 text-left text-sm text-[color:var(--ie-text-muted)] hover:border-[color:var(--ie-primary)]'>
								<span>Choose an option..</span>
								<ChevronDown
									size={16}
									className='text-[color:var(--ie-text-muted)]'
								/>
							</button>
						</div>
					</div>

					<div className='mt-auto flex items-center justify-end gap-3 border-t border-[color:var(--ie-border)] bg-white px-6 py-3'>
						<Dialog.Close asChild>
							<button className='cursor-pointer rounded-[10px] border border-[color:var(--ie-border)] bg-white px-4 py-2 text-sm text-[color:var(--ie-text)] hover:border-[color:var(--ie-primary)] hover:text-[color:var(--ie-primary)]'>
								Cancel
							</button>
						</Dialog.Close>
						<Dialog.Close asChild>
							<button className='cursor-pointer rounded-[10px] bg-[color:var(--ie-primary)] px-4 py-2 text-sm text-white hover:bg-[color:var(--ie-primary-hover)]'>
								Apply
							</button>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
