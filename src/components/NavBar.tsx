import { Bell, HelpCircle, MessageCircle, User } from 'lucide-react';
import Link from 'next/link';

import { ChatPanel } from '@/components/chat/ChatPanel';
import { NavLinks } from '@/components/NavLinks';
import { NotificationPanel } from '@/components/notifications/NotificationPanel';

export function NavBar() {
	return (
		<div
			className='w-full bg-[color:var(--ie-nav)]'
			style={{
				background:
					'linear-gradient(90deg, var(--ie-nav), var(--ie-nav-end))',
			}}
		>
			<div className='mx-auto flex h-14 max-w-6xl items-center gap-6 px-6'>
				<Link href='/' className='text-white'>
					Insights Engine
				</Link>
				<NavLinks />
				<input
					className='hidden w-[350px] rounded-[9999px] bg-white/95 px-5 py-2 text-sm text-[color:var(--ie-text)] outline-none placeholder:text-[color:var(--ie-text-muted)] md:block'
					placeholder='Search for insights...'
				/>
				<div className='ml-auto flex items-center gap-3'>
					<ChatPanel
						trigger={
							<button
								aria-label='Chat'
								className='grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-white/70 text-white hover:bg-white/10'
							>
								<MessageCircle size={16} />
							</button>
						}
					/>
					<button
						aria-label='Account'
						className='grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-white/70 text-white hover:bg-white/10'
					>
						<User size={16} />
					</button>
					<div className='hidden md:block'>
						<NotificationPanel
							trigger={
								<button
									aria-label='Notifications'
									className='grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-white/70 text-white hover:bg-white/10'
								>
									<Bell size={16} />
								</button>
							}
						/>
					</div>
					<button
						aria-label='Help'
						className='grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-white/70 text-white hover:bg-white/10'
					>
						<HelpCircle size={16} />
					</button>
				</div>
			</div>
		</div>
	);
}
