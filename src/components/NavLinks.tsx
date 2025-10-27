'use client';

import { Award, Home, Layers } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLinks() {
	const pathname = usePathname();

	const isHomeActive = pathname === '/';
	const isWorkspaceActive = pathname.startsWith('/workspace');
	const isCollectionsActive = pathname.startsWith('/collections');

	const linkClass = (href: string) => {
		const isActive =
			href === '/' ? pathname === '/' : pathname.startsWith(href);
		const baseClasses =
			'ie-button-hover ie-touch-target flex items-center gap-2 px-4 py-2 text-sm font-medium';
		const activeClasses =
			'rounded-lg bg-white font-medium text-slate-900 border border-slate-200';
		const inactiveClasses =
			'text-slate-500 hover:text-slate-900 transition-colors';

		return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
	};

	return (
		<nav className='flex items-center gap-1 lg:gap-2 xl:gap-3'>
			<Link href='/' className={linkClass('/')}>
				<Home
					size={16}
					className={
						isHomeActive ? 'text-slate-900' : 'text-slate-500'
					}
				/>
				Home
			</Link>
			<Link href='/workspace' className={linkClass('/workspace')}>
				<Award
					size={16}
					className={
						isWorkspaceActive ? 'text-slate-900' : 'text-slate-500'
					}
				/>
				Workspace
			</Link>
			<Link href='/collections' className={linkClass('/collections')}>
				<Layers
					size={16}
					className={
						isCollectionsActive
							? 'text-slate-900'
							: 'text-slate-500'
					}
				/>
				Collections
			</Link>
		</nav>
	);
}
