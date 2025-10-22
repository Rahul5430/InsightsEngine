import { AIIcon } from './AIIcon';

type Props = {
	count: number | string;
	className?: string;
};

export function NewInsightsBadge({ count, className = '' }: Props) {
	return (
		<span
			className={`ml-3 inline-flex items-center rounded-[9999px] border border-slate-800 bg-white px-3 py-1 text-[11px] font-semibold text-slate-800 ${className}`}
		>
			<AIIcon size={14} className='mr-1' />
			{count} New Insights
		</span>
	);
}
