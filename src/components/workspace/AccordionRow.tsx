'use client';

import { ChevronRight, Ellipsis, Expand, ListFilter, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { RowMenu } from '@/components/workspace/RowMenu';

import { NewInsightsBadge } from '../common/NewInsightsBadge';

type Props = {
	title: string;
	children: React.ReactNode;
	defaultOpen?: boolean;
	insightsCount?: number;
};

export function AccordionRow({
	title,
	children,
	defaultOpen = false,
	insightsCount = 0,
}: Props) {
	const [open, setOpen] = useState(defaultOpen);
	const [favourite, setFavourite] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const [maxHeight, setMaxHeight] = useState<string>(
		defaultOpen ? '9999px' : '0px'
	);

	useEffect(() => {
		const el = contentRef.current;
		if (!el) return;
		let timeoutId: number | undefined;
		if (open) {
			setMaxHeight(`${el.scrollHeight}px`);
			timeoutId = window.setTimeout(() => setMaxHeight('9999px'), 300);
		} else {
			setMaxHeight(`${el.scrollHeight}px`);
			requestAnimationFrame(() => setMaxHeight('0px'));
		}
		return () => {
			if (timeoutId) window.clearTimeout(timeoutId);
		};
	}, [open]);

	return (
		<div className='rounded-[14px] border border-slate-200 bg-gradient-to-b from-white to-slate-100 shadow-sm'>
			<div
				className='group flex h-[64px] w-full cursor-pointer items-center gap-2 px-5 text-left'
				onClick={() => setOpen((v) => !v)}
				role='button'
				aria-expanded={open}
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						setOpen((v) => !v);
					}
				}}
			>
				<span
					className={`flex-shrink-0 text-slate-800 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
				>
					<ChevronRight />
				</span>
				<span className='min-w-0 flex-1 truncate font-medium text-slate-900'>
					{title}
				</span>
				{insightsCount > 0 && (
					<span className='hidden md:inline-flex'>
						<NewInsightsBadge count={insightsCount} />
					</span>
				)}
				<div className='ml-2 flex flex-shrink-0 flex-row gap-1'>
					<button
						type='button'
						aria-label='Expand'
						onClick={(e) => {
							e.stopPropagation();
						}}
						className='text-slate-900-muted cursor-pointer rounded-full p-2 transition-colors hover:bg-slate-50 hover:text-slate-800'
					>
						<Expand size={16} />
					</button>
					<button
						type='button'
						aria-label='Star'
						onClick={(e) => {
							e.stopPropagation();
							setFavourite((v) => !v);
						}}
						className='text-slate-900-muted cursor-pointer rounded-full p-2 transition-colors hover:bg-slate-50 hover:text-slate-800'
					>
						{favourite ? (
							<Star
								size={16}
								fill='currentColor'
								className='text-slate-800'
							/>
						) : (
							<Star size={16} />
						)}
					</button>
					<button
						type='button'
						aria-label='Filter'
						onClick={(e) => {
							e.stopPropagation();
						}}
						className='text-slate-900-muted cursor-pointer rounded-full p-2 transition-colors hover:bg-slate-50 hover:text-slate-800'
					>
						<ListFilter size={16} />
					</button>
					<RowMenu
						trigger={
							<button
								type='button'
								aria-label='More'
								onClick={(e) => e.stopPropagation()}
								className='text-slate-900-muted cursor-pointer rounded-full p-2 transition-colors hover:bg-slate-50 hover:text-slate-800'
							>
								<Ellipsis size={16} />
							</button>
						}
					/>
				</div>
			</div>
			<div
				ref={contentRef}
				style={{ maxHeight }}
				className='overflow-hidden transition-[max-height] duration-300 ease-in-out'
			>
				<div
					className={`px-5 pb-5 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
