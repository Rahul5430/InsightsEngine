import { Skeleton } from '@/components/ui/skeleton';

export function ChartCardSkeleton() {
	return (
		<div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
			<div className='mb-4 flex items-center justify-between'>
				<Skeleton className='h-5 w-48' />
				<div className='flex items-center gap-2'>
					<Skeleton className='h-4 w-4 rounded-full' />
					<Skeleton className='h-4 w-16' />
				</div>
			</div>

			<div className='mb-4'>
				<Skeleton className='h-64 w-full rounded-lg' />
			</div>

			<div className='flex items-center justify-between'>
				<Skeleton className='h-3 w-24' />
				<Skeleton className='h-3 w-20' />
			</div>
		</div>
	);
}
