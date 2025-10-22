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
		<nav
			ref={navRef}
			className='sticky top-0 z-30 w-full border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100/95 backdrop-blur-md'
		>
			<div className='mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:gap-6 sm:px-6'>
				{/* Logo - modern styling */}
				<Link
					href='/'
					className='flex items-center gap-2 text-lg font-bold text-slate-800 transition-colors hover:text-slate-700 sm:text-xl'
				>
					<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500'>
						<span className='text-sm font-bold text-white'>IE</span>
					</div>
					<span className='hidden sm:inline'>Insights Engine</span>
				</Link>

				{/* Desktop nav links */}
				<div className='hidden md:block'>
					<NavLinks />
				</div>

				{/* Search bar - modern design */}
				<div className='relative max-w-md flex-1'>
					<input
						className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none'
						placeholder='Search insights, collections, or reports...'
					/>
				</div>

				<div className='flex items-center gap-2'>
					{/* Mobile hamburger menu */}
					<button
						aria-label='Menu'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className='ie-button-hover ie-touch-target grid h-12 w-12 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 md:hidden'
					>
						<Menu size={18} />
					</button>

					{/* Chat - modern styling */}
					<ChatPanel
						trigger={
							<button
								aria-label='Chat'
								className='ie-button-hover ie-touch-target relative grid h-12 w-12 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900'
							>
								<MessageCircle size={18} />
								{/* Notification dot */}
								<span className='absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500' />
							</button>
						}
					/>

					{/* Notifications - modern styling */}
					<NotificationPanel
						trigger={
							<button
								aria-label='Notifications'
								className='ie-button-hover ie-touch-target relative grid h-12 w-12 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900'
							>
								<Bell size={18} />
								{/* Notification dot */}
								<span className='absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500' />
							</button>
						}
					/>

					{/* Account - modern styling */}
					<button
						aria-label='Account'
						className='ie-button-hover grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900'
					>
						<User size={18} />
					</button>

					{/* Help - hidden on small screens */}
					<button
						aria-label='Help'
						className='ie-button-hover ie-touch-target hidden h-12 w-12 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 sm:grid'
					>
						<HelpCircle size={18} />
					</button>
				</div>
			</div>

			{/* Mobile Menu Backdrop - modern backdrop */}
			{mobileMenuOpen && (
				<div
					className='fixed inset-x-0 top-16 bottom-0 z-40 bg-black/20 backdrop-blur-sm md:hidden'
					onClick={() => setMobileMenuOpen(false)}
				/>
			)}

			{/* Mobile Menu */}
			<MobileMenu
				open={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
			/>
		</nav>
	);
}
