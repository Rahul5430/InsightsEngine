import { MessageCircle } from 'lucide-react';

import { ChatPanel } from '@/components/chat/ChatPanel';

export function Fab() {
	return (
		<ChatPanel
			trigger={
				<button
					className='fixed right-6 bottom-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[color:var(--ie-primary)] text-white shadow-[0_0_0_3px_var(--ie-surface),0_0_0_8px_rgba(235,113,0,0.5)] shadow-[0_12px_30px_rgba(235,113,0,0.35)]'
					aria-label='Open assistant'
				>
					<MessageCircle />
				</button>
			}
		/>
	);
}
