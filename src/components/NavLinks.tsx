'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLinks() {
	const pathname = usePathname();
	const linkClass = (href: string) =>
		pathname === href
			? 'rounded-[9999px] bg-white/90 px-3 py-1 text-sm text-[color:var(--ie-nav)]'
			: 'px-3 py-1 text-sm text-white hover:text-white/90';

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
