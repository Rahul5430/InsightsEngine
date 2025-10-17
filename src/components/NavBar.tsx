'use client';

import { Bell, HelpCircle, Menu, MessageCircle, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { ChatPanel } from '@/components/chat/ChatPanel';
import { MobileMenu } from '@/components/MobileMenu';
import { NavLinks } from '@/components/NavLinks';
import { NotificationPanel } from '@/components/notifications/NotificationPanel';

export function NavBar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				navRef.current &&
				!navRef.current.contains(event.target as Node)
			) {
				setMobileMenuOpen(false);
			}
		}

		if (mobileMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [mobileMenuOpen]);

	return (
		<div
			ref={navRef}
			className='relative w-full bg-[color:var(--ie-nav)]'
			style={{
				background:
					'linear-gradient(90deg, var(--ie-nav), var(--ie-nav-end))',
			}}
		>
			<div className='mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:gap-4 sm:px-6'>
				{/* Logo - responsive sizing */}
				<Link
					href='/'
					className='text-sm font-semibold text-white sm:text-base'
				>
					<span className='hidden sm:inline'>Insights Engine</span>
					<span className='sm:hidden'>IE</span>
				</Link>

				{/* desktop nav links */}
				<div className='hidden md:block'>
					<NavLinks />
				</div>

				{/* Search bar - responsive width and visibility */}
				<input
					className='hidden w-[120px] rounded-[9999px] bg-white/95 px-3 py-1.5 text-xs text-[color:var(--ie-text)] outline-none placeholder:text-[color:var(--ie-text-muted)] sm:block sm:w-[180px] sm:px-4 sm:py-2 sm:text-sm md:w-[300px] lg:w-[350px]'
					placeholder='Search...'
				/>

				<div className='ml-auto flex items-center gap-1 sm:gap-2'>
					{/* mobile hamburger menu */}
					<button
						aria-label='Menu'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className='grid h-7 w-7 cursor-pointer place-items-center rounded-full border border-white/70 text-white hover:bg-white/10 sm:h-8 sm:w-8 md:hidden'
					>
						<Menu size={14} className='sm:h-4 sm:w-4' />
					</button>

					{/* Chat - always visible */}
					<ChatPanel
						trigger={
							<button
								aria-label='Chat'
								className='grid h-7 w-7 cursor-pointer place-items-center rounded-full border border-white/70 text-white hover:bg-white/10 sm:h-8 sm:w-8'
							>
								<MessageCircle
									size={14}
									className='sm:h-4 sm:w-4'
								/>
							</button>
						}
					/>

					{/* Account - always visible */}
					<button
						aria-label='Account'
						className='grid h-7 w-7 cursor-pointer place-items-center rounded-full border border-white/70 text-white hover:bg-white/10 sm:h-8 sm:w-8'
					>
						<User size={14} className='sm:h-4 sm:w-4' />
					</button>

					{/* Notifications - always visible */}
					<NotificationPanel
						trigger={
							<button
								aria-label='Notifications'
								className='grid h-7 w-7 cursor-pointer place-items-center rounded-full border border-white/70 text-white hover:bg-white/10 sm:h-8 sm:w-8'
							>
								<Bell size={14} className='sm:h-4 sm:w-4' />
							</button>
						}
					/>

					{/* Help - hidden on very small screens */}
					<button
						aria-label='Help'
						className='grid hidden h-7 w-7 cursor-pointer place-items-center rounded-full border border-white/70 text-white hover:bg-white/10 sm:grid sm:h-8 sm:w-8'
					>
						<HelpCircle size={14} className='sm:h-4 sm:w-4' />
					</button>
				</div>
			</div>

			{/* Mobile Menu Backdrop - only covers content below navbar */}
			{mobileMenuOpen && (
				<div
					className='animate-in fade-in fixed inset-x-0 top-14 bottom-0 z-40 bg-black/20 duration-200 md:hidden'
					onClick={() => setMobileMenuOpen(false)}
				/>
			)}

			{/* Mobile Menu */}
			<MobileMenu
				open={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
			/>
		</div>
	);
}
