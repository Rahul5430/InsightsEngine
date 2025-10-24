'use client';

import { MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const ChatPanel = dynamic(
	() =>
		import('@/components/chat/ChatPanel').then((mod) => ({
			default: mod.ChatPanel,
		})),
	{
		ssr: false,
		loading: () => (
			<button
				className='ie-button-hover ie-touch-target fixed right-6 bottom-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg hover:shadow-xl'
				aria-label='Open assistant'
			>
				<MessageCircle />
			</button>
		),
	}
);

export function Fab() {
	return (
		<ChatPanel
			trigger={
				<button
					className='ie-button-hover ie-touch-target fixed right-6 bottom-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg hover:shadow-xl'
					aria-label='Open assistant'
				>
					<MessageCircle />
				</button>
			}
		/>
	);
}
