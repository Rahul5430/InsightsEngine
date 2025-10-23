'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLinks() {
	const pathname = usePathname();

	const linkClass = (href: string) => {
		const isActive =
			href === '/' ? pathname === '/' : pathname.startsWith(href);
		const baseClasses =
			'ie-button-hover ie-touch-target flex items-center px-3 py-1.5 text-sm';
		const activeClasses =
			'rounded-lg bg-white font-medium text-slate-900 border border-slate-200';
		const inactiveClasses =
			'text-slate-500 hover:text-slate-900 transition-colors';

		return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
	};

	return (
		<nav className='flex items-center gap-1 lg:gap-2 xl:gap-3'>
			<Link href='/' className={linkClass('/')}>
				Home
			</Link>
			<Link href='/workspace' className={linkClass('/workspace')}>
				Workspace
			</Link>
			<Link href='/collections' className={linkClass('/collections')}>
				Collections
			</Link>
		</nav>
	);
}
