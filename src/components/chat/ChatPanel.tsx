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
		const root = document.documentElement;
		if (open) {
			root.classList.add('ie-chat-open');
		} else {
			root.classList.remove('ie-chat-open');
		}
		return () => root.classList.remove('ie-chat-open');
	}, [open]);

	return (
		<Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='ie-overlay fixed inset-0 z-40 bg-black/40' />
				<Dialog.Content className='ie-sheet fixed top-0 right-0 z-50 flex h-full w-[440px] max-w-[95vw] flex-col rounded-l-[16px] border-l border-[color:var(--ie-border)] bg-white shadow-xl'>
					<div className='sticky top-0 z-10 flex items-center justify-between border-b border-[color:var(--ie-border)] bg-white px-6 py-4'>
						<Dialog.Title className='flex items-center gap-2 text-[color:var(--ie-text)]'>
							<MessageCircle size={18} /> Smart Assistant
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
					<Dialog.Description className='sr-only'>
						Chat assistant panel
					</Dialog.Description>
					<div className='flex-1 space-y-4 overflow-y-auto px-6 py-4'>
						{messages.map((m) => (
							<div
								key={m.id}
								className={`max-w-[90%] rounded-[12px] px-4 py-3 text-[14px] ${m.role === 'user' ? 'ml-auto bg-[color:var(--ie-badge-bg)]' : 'border border-[color:var(--ie-border)] bg-white'}`}
							>
								{m.content}
							</div>
						))}
						{/* simple placeholder chart image block */}
						<div className='rounded-[12px] border border-[color:var(--ie-border)] p-3'>
							<div className='mb-2 text-sm font-medium text-[color:var(--ie-text)]'>
								Here is the historical Postcard Recent Rate in
								2022 and 2023:
							</div>
							<div className='h-36 rounded-md bg-[color:var(--ie-surface-muted)]' />
						</div>
					</div>
					<div className='border-t border-[color:var(--ie-border)] bg-white px-4 py-3'>
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
								className='grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-[color:var(--ie-border)] text-[color:var(--ie-primary)]'
							>
								+
							</button>
							<input
								value={text}
								onChange={(e) => setText(e.target.value)}
								placeholder='What do you need help with?'
								className='flex-1 rounded-[12px] border border-[color:var(--ie-border)] bg-white px-3 py-2 text-sm outline-none'
							/>
							<button
								type='submit'
								className='grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-[color:var(--ie-primary)] text-white'
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
