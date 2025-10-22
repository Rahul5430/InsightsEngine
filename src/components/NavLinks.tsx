'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLinks() {
	const pathname = usePathname();

	const linkClass = (href: string) => {
		// Special case for home route - only match exact path
		if (href === '/') {
			return pathname === '/'
				? 'rounded-[9999px] bg-white/90 px-3 py-1 text-sm text-nav'
				: 'px-3 py-1 text-sm';
		}
		// For other routes, use startsWith
		return pathname.startsWith(href)
			? 'rounded-[9999px] bg-white/90 px-3 py-1 text-sm text-nav'
			: 'px-3 py-1 text-sm';
	};

	return (
		<nav className='hidden gap-2 md:flex'>
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
