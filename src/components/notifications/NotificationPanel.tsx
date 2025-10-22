'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';

type Notification = {
	id: string;
	title: string;
	body: string;
	unread?: boolean;
};

type Props = {
	notifications?: Notification[];
	trigger: React.ReactNode; // external trigger element (e.g., Bell button)
};

export function NotificationPanel({ notifications = [], trigger }: Props) {
	const [open, setOpen] = useState(false);

	const items =
		notifications.length > 0
			? notifications
			: [
					{
						id: '1',
						title: 'Notification Title',
						body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						unread: true,
					},
					{
						id: '2',
						title: 'Notification Title',
						body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					},
					{
						id: '3',
						title: 'Notification Title',
						body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					},
				];
	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='ie-overlay fixed inset-0 z-40 bg-black/40' />
				<Dialog.Content className='ie-sheet fixed top-0 right-0 z-50 flex h-full w-[440px] max-w-[90vw] flex-col rounded-l-[16px] border-l border-slate-200 bg-white shadow-xl'>
					<div className='sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4'>
						<Dialog.Title className='text-xl font-semibold text-slate-900'>
							Notifications
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
					<div className='space-y-4 overflow-y-auto px-6 py-3'>
						{items.map((n) => (
							<div
								key={n.id}
								className='rounded-[12px] border border-slate-200 p-4'
							>
								<div className='flex items-start gap-3'>
									<div
										className={`mt-1 h-2 w-2 rounded-full ${n.unread ? 'bg-primary' : 'bg-border'}`}
									/>
									<div>
										<div className='font-medium text-slate-900'>
											{n.title}
										</div>
										<div className='mt-1 line-clamp-2 text-sm text-slate-500'>
											{n.body}
										</div>
										<button className='mt-1 text-sm font-medium text-slate-800'>
											See More
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className='mt-auto border-t border-slate-200 bg-white px-6 py-3'>
						<Dialog.Close asChild>
							<button className='ml-auto block cursor-pointer rounded-[10px] border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 hover:border-slate-800 hover:text-slate-800'>
								Close
							</button>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
