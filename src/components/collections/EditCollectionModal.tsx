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
				<Dialog.Content className='fixed top-1/2 left-1/2 z-50 w-[560px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[16px] border border-transparent bg-white outline outline-[color:var(--ie-border)]'>
					<div className='flex items-center justify-between border-b border-[color:var(--ie-border)] px-6 py-4'>
						<Dialog.Title className='text-xl font-semibold text-[color:var(--ie-text)]'>
							Edit Collection
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
					<div className='space-y-4 px-6 py-5'>
						<div>
							<div className='mb-2 text-sm font-semibold text-[color:var(--ie-text)]'>
								Collection Name
							</div>
							<input
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								className='w-full rounded-[10px] border border-[color:var(--ie-border)] bg-[color:var(--ie-surface)] px-4 py-2.5 text-sm outline-none focus:border-[color:var(--ie-primary)]'
							/>
						</div>
						<div>
							<div className='mb-2 text-sm font-semibold text-[color:var(--ie-text)]'>
								Collection Description
							</div>
							<textarea
								value={desc}
								onChange={(e) =>
									setDesc(e.target.value.slice(0, limit))
								}
								rows={5}
								className='w-full resize-none rounded-[10px] border border-[color:var(--ie-border)] bg-[color:var(--ie-surface)] px-4 py-2.5 text-sm outline-none focus:border-[color:var(--ie-primary)]'
							/>
							<div className='mt-1 text-right text-xs text-[color:var(--ie-text-muted)]'>
								{remaining}
							</div>
						</div>
					</div>
					<div className='flex items-center justify-end gap-3 border-t border-[color:var(--ie-border)] bg-white px-6 py-3'>
						<Dialog.Close asChild>
							<button className='cursor-pointer rounded-[10px] border border-[color:var(--ie-border)] bg-white px-4 py-2 text-sm text-[color:var(--ie-text)] hover:border-[color:var(--ie-primary)] hover:text-[color:var(--ie-primary)]'>
								Cancel
							</button>
						</Dialog.Close>
						<Dialog.Close asChild>
							<button
								onClick={() =>
									onSave?.({ name, description: desc })
								}
								className='cursor-pointer rounded-[10px] bg-[color:var(--ie-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[color:var(--ie-primary-hover)]'
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
