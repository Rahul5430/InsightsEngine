'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
	open: boolean;
	onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
	const pathname = usePathname();

	const linkClass = (href: string) => {
		const baseClass =
			'flex items-center justify-between rounded-xl px-6 py-4 text-base font-medium transition-all duration-200';

		// Special case for home route - only match exact path
		if (href === '/') {
			return pathname === '/'
				? `${baseClass} bg-white/20 text-white shadow-sm`
				: `${baseClass} text-white hover:bg-white/10`;
		}
		// For other routes, use startsWith
		return pathname.startsWith(href)
			? `${baseClass} bg-white/20 text-white shadow-sm`
			: `${baseClass} text-white hover:bg-white/10`;
	};

	return (
		<div
			className={`absolute right-0 left-0 z-50 transition-all duration-200 ${
				open
					? 'translate-y-0 opacity-100'
					: 'pointer-events-none -translate-y-2 opacity-0'
			}`}
			style={{
				top: '56px',
			}}
		>
			<div
				className='overflow-hidden rounded-b-2xl shadow-2xl'
				style={{
					background:
						'linear-gradient(90deg, var(--ie-nav), var(--ie-nav-end))',
					margin: 0,
					padding: 0,
				}}
			>
				<div className='py-3'>
					<Link href='/' className={linkClass('/')} onClick={onClose}>
						<span>Home</span>
						<ChevronDown
							size={18}
							className='rotate-[-90deg] text-white/70'
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
							className='rotate-[-90deg] text-white/70'
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
							className='rotate-[-90deg] text-white/70'
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
