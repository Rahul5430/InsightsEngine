'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';

type Props = {
	trigger: React.ReactNode;
	initialName?: string;
	initialDescription?: string;
	onSave?: (data: { name: string; description: string }) => void;
};

export function EditCollectionModal({
	trigger,
	initialName = 'Name Collection',
	initialDescription = '',
	onSave,
}: Props) {
	const [name, setName] = useState(initialName);
	const [desc, setDesc] = useState(initialDescription);

	const limit = 100;
	const remaining = `${Math.min(desc.length, limit)}/${limit}`;

	return (
		<Dialog.Root modal>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='ie-overlay fixed inset-0 z-40 bg-black/40' />
				<Dialog.Content className='outline-border fixed top-1/2 left-1/2 z-50 w-[560px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[16px] border border-transparent bg-white outline'>
					<div className='flex items-center justify-between border-b border-slate-200 px-6 py-4'>
						<Dialog.Title className='text-xl font-semibold text-slate-900'>
							Edit Collection
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
					<div className='space-y-4 px-6 py-5'>
						<div>
							<div className='mb-2 text-sm font-semibold text-slate-900'>
								Collection Name
							</div>
							<input
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								className='w-full rounded-[10px] border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-800'
							/>
						</div>
						<div>
							<div className='mb-2 text-sm font-semibold text-slate-900'>
								Collection Description
							</div>
							<textarea
								value={desc}
								onChange={(e) =>
									setDesc(e.target.value.slice(0, limit))
								}
								rows={5}
								className='w-full resize-none rounded-[10px] border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-800'
							/>
							<div className='mt-1 text-right text-xs text-slate-500'>
								{remaining}
							</div>
						</div>
					</div>
					<div className='flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-3'>
						<Dialog.Close asChild>
							<button className='cursor-pointer rounded-[10px] border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 hover:border-slate-800 hover:text-slate-800'>
								Cancel
							</button>
						</Dialog.Close>
						<Dialog.Close asChild>
							<button
								onClick={() =>
									onSave?.({ name, description: desc })
								}
								className='bg-primary hover:bg-primary-light cursor-pointer rounded-[10px] px-4 py-2 text-sm font-medium text-white'
							>
								Save Changes
							</button>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
