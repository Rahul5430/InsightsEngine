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
	const [isVisible, setIsVisible] = useState(false);
	const [hasLoaded, setHasLoaded] = useState(false);
	const [showContent, setShowContent] = useState(defaultOpen);
	const contentRef = useRef<HTMLDivElement>(null);
	const accordionRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [maxHeight, setMaxHeight] = useState<string>(
		defaultOpen ? '9999px' : '0px'
	);

	// Intersection Observer for lazy loading
	useEffect(() => {
		const accordion = accordionRef.current;
		if (!accordion) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					// Load content using requestAnimationFrame for better performance
					requestAnimationFrame(() => {
						requestAnimationFrame(() => setHasLoaded(true));
					});
					observer.disconnect();
				}
			},
			{
				rootMargin: '100px', // Start loading 100px before it comes into view
				threshold: 0.1,
			}
		);

		observer.observe(accordion);

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const el = contentRef.current;
		if (!el) return;

		if (open) {
			// Use requestAnimationFrame to avoid synchronous setState
			requestAnimationFrame(() => {
				// Set to a large value first to allow content to render
				setMaxHeight('9999px');

				// Wait a bit longer to ensure content is fully rendered
				setTimeout(() => {
					const contentHeight = el.scrollHeight;
					setMaxHeight(`${contentHeight}px`);
				}, 50);
			});
		} else {
			// Set to current height first, then to 0 for smooth transition
			const currentHeight = el.scrollHeight;
			setMaxHeight(`${currentHeight}px`);
			requestAnimationFrame(() => setMaxHeight('0px'));
		}
	}, [open]);

	// Handle content visibility changes
	const handleOpenChange = (newOpen: boolean) => {
		// Clear any existing timeout
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		if (newOpen) {
			// Show content immediately when opening
			setShowContent(true);
		} else {
			// Hide content after the closing animation completes (300ms)
			timeoutRef.current = setTimeout(() => setShowContent(false), 300);
		}
	};

	// Update content visibility when open state changes
	useEffect(() => {
		// Use requestAnimationFrame to avoid synchronous setState
		requestAnimationFrame(() => {
			handleOpenChange(open);
		});
	}, [open]);

	return (
		<div
			ref={accordionRef}
			className='rounded-[14px] border border-slate-200 bg-gradient-to-b from-white to-slate-100 shadow-sm'
		>
			<div
				className='group flex min-h-[56px] w-full cursor-pointer items-center gap-2 px-3 py-2 text-left md:min-h-[64px] md:px-5 md:py-3'
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
					<ChevronRight size={16} className='md:h-4 md:w-4' />
				</span>
				<span className='min-w-0 flex-1 text-sm leading-tight font-medium text-slate-900 md:text-base'>
					{title}
				</span>
				{insightsCount > 0 && (
					<span className='inline-flex flex-shrink-0'>
						<NewInsightsBadge count={insightsCount} />
					</span>
				)}
				<div className='ml-1 flex flex-shrink-0 flex-row gap-0.5 md:ml-2 md:gap-1'>
					<button
						type='button'
						aria-label='Expand'
						onClick={(e) => {
							e.stopPropagation();
						}}
						className='text-slate-900-muted cursor-pointer rounded-full p-1.5 transition-colors hover:bg-slate-50 hover:text-slate-800 md:p-2'
					>
						<Expand size={14} className='md:h-4 md:w-4' />
					</button>
					<button
						type='button'
						aria-label='Star'
						onClick={(e) => {
							e.stopPropagation();
							setFavourite((v) => !v);
						}}
						className='text-slate-900-muted cursor-pointer rounded-full p-1.5 transition-colors hover:bg-slate-50 hover:text-slate-800 md:p-2'
					>
						{favourite ? (
							<Star
								size={14}
								fill='currentColor'
								className='text-slate-800 md:h-4 md:w-4'
							/>
						) : (
							<Star size={14} className='md:h-4 md:w-4' />
						)}
					</button>
					<button
						type='button'
						aria-label='Filter'
						onClick={(e) => {
							e.stopPropagation();
						}}
						className='text-slate-900-muted cursor-pointer rounded-full p-1.5 transition-colors hover:bg-slate-50 hover:text-slate-800 md:p-2'
					>
						<ListFilter size={14} className='md:h-4 md:w-4' />
					</button>
					<RowMenu
						trigger={
							<button
								type='button'
								aria-label='More'
								onClick={(e) => e.stopPropagation()}
								className='text-slate-900-muted cursor-pointer rounded-full p-1.5 transition-colors hover:bg-slate-50 hover:text-slate-800 md:p-2'
							>
								<Ellipsis size={14} className='md:h-4 md:w-4' />
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
					className={`px-3 pb-3 transition-opacity duration-300 md:px-5 md:pb-5 ${open ? 'opacity-100' : 'opacity-0'}`}
				>
					{isVisible && showContent && hasLoaded ? (
						children
					) : isVisible && showContent ? (
						<div className='flex items-center justify-center py-8'>
							<div className='h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent' />
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
