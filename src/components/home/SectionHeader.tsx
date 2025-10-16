import { ReactNode } from 'react';

type Props = {
	left: ReactNode;
	right?: ReactNode;
};

export function SectionHeader({ left, right }: Props) {
	return (
		<div className='flex items-center justify-between py-4'>
			<div className='text-lg font-semibold text-[color:var(--ie-text)]'>
				{left}
			</div>
			{right ? (
				<div className='text-sm text-[color:var(--ie-primary)]'>
					{right}
				</div>
			) : null}
		</div>
	);
}
