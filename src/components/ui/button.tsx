import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'ghost';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: Variant;
};

export function Button({
	variant = 'primary',
	className = '',
	...props
}: Props) {
	const base =
		'inline-flex items-center justify-center rounded-[var(--ie-radius-md)] px-4 py-2 text-sm font-medium transition-colors';
	const variants: Record<Variant, string> = {
		primary:
			'bg-[color:var(--ie-primary)] text-white hover:bg-[color:var(--ie-primary-hover)]',
		ghost: 'bg-transparent text-[color:var(--ie-primary)] hover:bg-[color:var(--ie-badge-bg)]',
	};
	return (
		<button
			className={`${base} ${variants[variant]} ${className}`}
			{...props}
		/>
	);
}
