'use client';

import {
	Bell,
	HelpCircle,
	Menu,
	MessageCircle,
	Search,
	User,
	X,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { ChatPanel } from '@/components/chat/ChatPanel';
import { MobileMenu } from '@/components/MobileMenu';
import { NavLinks } from '@/components/NavLinks';
import { NotificationPanel } from '@/components/notifications/NotificationPanel';

export function NavBar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
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

	// Close mobile menu when switching to tablet/desktop
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setMobileMenuOpen(false);
				setSearchOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<nav
			ref={navRef}
			className='sticky top-0 z-30 w-full border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100/95 backdrop-blur-md'
		>
			{/* Mobile Layout (320px-767px) */}
			<div className='md:hidden'>
				{/* Main mobile navbar */}
				<div className='flex h-14 items-center justify-between px-3 sm:h-16 sm:px-4'>
					{/* Logo - compact for mobile */}
					<Link
						href='/'
						className='flex items-center gap-2 text-base font-bold text-slate-800 transition-colors hover:text-slate-700'
					>
						<div className='flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 sm:h-8 sm:w-8'>
							<span className='text-xs font-bold text-white sm:text-sm'>
								IE
							</span>
						</div>
						<span className='text-sm sm:text-base'>
							Insights Engine
						</span>
					</Link>

					<div className='flex items-center gap-1'>
						{/* Mobile search toggle */}
						<button
							aria-label='Search'
							onClick={() => setSearchOpen(!searchOpen)}
							className='ie-button-hover ie-touch-target grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900'
						>
							{searchOpen ? (
								<X size={16} />
							) : (
								<Search size={16} />
							)}
						</button>

						{/* Mobile hamburger menu */}
						<button
							aria-label='Menu'
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='ie-button-hover ie-touch-target grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900'
						>
							<Menu size={16} />
						</button>
					</div>
				</div>

				{/* Collapsible search bar for mobile */}
				{searchOpen && (
					<div className='ie-mobile-search px-3 pb-3 sm:px-4'>
						<input
							id='mobile-search'
							name='mobile-search'
							className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none'
							placeholder='Search insights, collections, or reports...'
							autoFocus
						/>
					</div>
				)}
			</div>

			{/* Tablet & Desktop Layout (768px+) */}
			<div className='hidden md:block'>
				<div className='lg:max-w-8xl xl:max-w-9xl mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:gap-6 lg:px-6 2xl:max-w-[1400px]'>
					{/* Logo - full size for tablet/desktop */}
					<Link
						href='/'
						className='flex items-center gap-2 text-lg font-bold text-slate-800 transition-colors hover:text-slate-700 lg:text-xl'
					>
						<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500'>
							<span className='text-sm font-bold text-white'>
								IE
							</span>
						</div>
						<span>Insights Engine</span>
					</Link>

					{/* Tablet & Desktop nav links */}
					<div className='hidden md:block'>
						<NavLinks />
					</div>

					{/* Search bar - responsive sizing */}
					<div className='relative max-w-sm flex-1 lg:max-w-md xl:max-w-lg'>
						<input
							id='desktop-search'
							name='desktop-search'
							className='w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none lg:px-4 lg:py-2.5'
							placeholder='Search insights...'
						/>
					</div>

					<div className='flex items-center gap-1 lg:gap-2'>
						{/* Chat - responsive sizing */}
						<ChatPanel
							trigger={
								<button
									aria-label='Chat'
									className='ie-button-hover ie-touch-target relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 lg:h-12 lg:w-12'
								>
									<MessageCircle
										size={16}
										className='lg:hidden'
									/>
									<MessageCircle
										size={18}
										className='hidden lg:block'
									/>
									{/* Notification dot */}
									<span className='absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 lg:h-3 lg:w-3' />
								</button>
							}
						/>

						{/* Notifications - responsive sizing */}
						<NotificationPanel
							trigger={
								<button
									aria-label='Notifications'
									className='ie-button-hover ie-touch-target relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 lg:h-12 lg:w-12'
								>
									<Bell size={16} className='lg:hidden' />
									<Bell
										size={18}
										className='hidden lg:block'
									/>
									{/* Notification dot */}
									<span className='absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 lg:h-3 lg:w-3' />
								</button>
							}
						/>

						{/* Account - responsive sizing */}
						<button
							aria-label='Account'
							className='ie-button-hover ie-touch-target grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 lg:h-12 lg:w-12'
						>
							<User size={16} className='lg:hidden' />
							<User size={18} className='hidden lg:block' />
						</button>

						{/* Help - visible on larger screens */}
						<button
							aria-label='Help'
							className='ie-button-hover ie-touch-target hidden h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 lg:grid lg:h-12 lg:w-12'
						>
							<HelpCircle size={16} className='lg:hidden' />
							<HelpCircle size={18} className='hidden lg:block' />
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu Backdrop - modern backdrop */}
			{mobileMenuOpen && (
				<div
					className={`fixed inset-x-0 bottom-0 z-40 bg-black/30 backdrop-blur-sm md:hidden ${
						searchOpen ? 'top-26 sm:top-28' : 'top-14 sm:top-16'
					}`}
					onClick={() => setMobileMenuOpen(false)}
				/>
			)}

			{/* Mobile Menu */}
			<MobileMenu
				open={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
				searchOpen={searchOpen}
			/>
		</nav>
	);
}
