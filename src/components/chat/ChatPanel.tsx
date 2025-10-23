'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Message = { id: string; role: 'user' | 'assistant'; content: string };

export function ChatPanel({ trigger }: { trigger: React.ReactNode }) {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: 'q1',
			role: 'user',
			content:
				'What was the historical Postcard Recall Rate in 2022 and 2023?',
		},
		{
			id: 'a1',
			role: 'assistant',
			content:
				'Here is the historical Postcard Recent Rate in 2022 and 2023:',
		},
	]);
	const [text, setText] = useState('');
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const body = document.body;
		if (open) {
			body.classList.add('ie-chat-open');
		} else {
			body.classList.remove('ie-chat-open');
		}
		return () => body.classList.remove('ie-chat-open');
	}, [open]);

	return (
		<Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='ie-overlay fixed inset-0 z-40 bg-black/40' />
				<Dialog.Content className='ie-sheet data-[state=open]:animate-slide-up data-[state=closed]:animate-slide-down fixed inset-0 z-50 flex h-full w-full flex-col overflow-hidden bg-white sm:inset-auto sm:top-0 sm:right-0 sm:left-auto sm:h-full sm:w-[440px] sm:max-w-[440px] sm:rounded-l-[16px] sm:border-t-0 sm:border-l sm:data-[state=closed]:animate-none sm:data-[state=open]:animate-none'>
					<div className='sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4'>
						<Dialog.Title className='flex items-center gap-2 text-slate-900'>
							<MessageCircle size={18} /> Smart Assistant
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
					<Dialog.Description className='sr-only'>
						Chat assistant panel
					</Dialog.Description>
					<div className='flex-1 space-y-4 overflow-y-auto px-6 py-4'>
						{messages.map((m) => (
							<div
								key={m.id}
								className={`max-w-[90%] rounded-[12px] px-4 py-3 text-[14px] ${m.role === 'user' ? 'ml-auto bg-slate-50' : 'border border-slate-200 bg-white'}`}
							>
								{m.content}
							</div>
						))}
						{/* simple placeholder chart image block */}
						<div className='rounded-[12px] border border-slate-200 p-3'>
							<div className='mb-2 text-sm font-medium text-slate-900'>
								Here is the historical Postcard Recent Rate in
								2022 and 2023:
							</div>
							<div className='h-36 rounded-md bg-slate-100' />
						</div>
					</div>
					<div className='border-t border-slate-200 bg-white px-4 py-3'>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								if (!text.trim()) return;
								setMessages((prev) => [
									...prev,
									{
										id: `u${prev.length}`,
										role: 'user',
										content: text.trim(),
									},
								]);
								setText('');
							}}
							className='flex items-center gap-2'
						>
							<button
								type='button'
								className='grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-slate-200 text-slate-800'
							>
								+
							</button>
							<input
								value={text}
								onChange={(e) => setText(e.target.value)}
								placeholder='What do you need help with?'
								className='flex-1 rounded-[12px] border border-slate-200 bg-white px-3 py-2 text-sm outline-none'
							/>
							<button
								type='submit'
								className='bg-primary grid h-9 w-9 cursor-pointer place-items-center rounded-full text-white'
							>
								<Send size={16} />
							</button>
						</form>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
