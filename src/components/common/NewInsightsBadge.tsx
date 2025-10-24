import { AIIcon } from './AIIcon';

type Props = {
	count: number | string;
	className?: string;
};

export function NewInsightsBadge({ count, className = '' }: Props) {
	return (
		<span
			className={`ml-2 inline-flex items-center rounded-[9999px] border border-slate-800 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-800 md:ml-3 md:px-3 md:py-1 md:text-[11px] ${className}`}
		>
			<AIIcon size={12} className='mr-0.5 md:mr-1 md:h-3.5 md:w-3.5' />
			<span className='hidden sm:inline'>{count} New Insights</span>
			<span className='sm:hidden'>{count}</span>
		</span>
	);
}
