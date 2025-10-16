'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
	Download,
	FolderPlus,
	Share2,
	Sparkles,
	Trash2,
	ZapOff,
} from 'lucide-react';

export function RowMenu({ trigger }: { trigger: React.ReactNode }) {
	const item = (
		Icon: (props: {
			size?: number | string;
			className?: string;
		}) => React.ReactNode,
		label: string
	) => (
		<DropdownMenu.Item className='flex cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2 text-sm outline-none select-none hover:bg-[color:var(--ie-badge-bg)]'>
			<Icon size={16} />
			<span>{label}</span>
		</DropdownMenu.Item>
	);

	return (
		<DropdownMenu.Root modal={false}>
			<DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					sideOffset={6}
					align='end'
					className='z-50 w-56 rounded-[12px] border border-[color:var(--ie-border)] bg-white p-2 shadow-[var(--ie-shadow-card)]'
				>
					{item(FolderPlus, 'Add to Collection')}
					{item(Share2, 'Share')}
					{item(Sparkles, 'Ask Smart Assist')}
					{item(Download, 'Download')}
					{item(ZapOff, 'Snooze')}
					{item(Trash2, 'Delete')}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
