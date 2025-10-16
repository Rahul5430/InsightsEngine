import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className = '', ...props }: Props) {
	return (
		<span
			className={`inline-flex items-center rounded-[var(--ie-radius-pill)] bg-[color:var(--ie-badge-bg)] px-3 py-1 text-xs font-medium text-[color:var(--ie-primary)] ${className}`}
			{...props}
		/>
	);
}
