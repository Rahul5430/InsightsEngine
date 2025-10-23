'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
	open: boolean;
	onClose: () => void;
	searchOpen?: boolean;
};

export function MobileMenu({ open, onClose, searchOpen = false }: Props) {
	const pathname = usePathname();

	const linkClass = (href: string) => {
		const isActive =
			href === '/' ? pathname === '/' : pathname.startsWith(href);
		const baseClasses =
			'flex items-center justify-between rounded-xl px-6 py-4 text-base font-medium transition-all duration-200';
		const activeClasses =
			'bg-white text-slate-900 shadow-sm border border-slate-200';
		const inactiveClasses =
			'text-slate-600 hover:bg-slate-100 hover:text-slate-900';

		return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
	};

	return (
		<div
			className={`absolute right-0 left-0 z-50 transition-all duration-200 md:hidden ${
				open
					? 'translate-y-0 opacity-100'
					: 'pointer-events-none -translate-y-2 opacity-0'
			}`}
			style={{
				top: searchOpen ? '104px' : '56px', // 56px navbar + 48px search bar (py-3 + input height)
			}}
		>
			<div className='overflow-hidden rounded-b-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100/95 shadow-2xl'>
				<div className='py-3'>
					<Link href='/' className={linkClass('/')} onClick={onClose}>
						<span>Home</span>
						<ChevronDown
							size={18}
							className='rotate-[-90deg] text-slate-500'
						/>
					</Link>
					<Link
						href='/workspace'
						className={linkClass('/workspace')}
						onClick={onClose}
					>
						<span>Workspace</span>
						<ChevronDown
							size={18}
							className='rotate-[-90deg] text-slate-500'
						/>
					</Link>
					<Link
						href='/collections'
						className={linkClass('/collections')}
						onClick={onClose}
					>
						<span>Collections</span>
						<ChevronDown
							size={18}
							className='rotate-[-90deg] text-slate-500'
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
