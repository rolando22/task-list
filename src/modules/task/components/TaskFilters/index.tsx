import { useSearchParams } from 'react-router-dom';

import type { TaskFilters } from '@/modules/task/types';

interface Props {
  onFilterCompleted: (completed: TaskFilters['completed']) => () => void;
}

export function TaskFilters({ onFilterCompleted }: Props) { 
	const [searchParams] = useSearchParams();
	const completed = (searchParams.get('completed') || '') as TaskFilters['completed'];

	return (
		<div className='flex gap-2'>
			<span
				className={`bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 hover:border hover:border-white cursor-pointer ${completed === '' ? 'border border-white' : ''}`}
				onClick={onFilterCompleted('')}
			>
        All
			</span>
			<span
				className={`bg-gray-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-green-300 hover:border hover:border-white cursor-pointer ${completed === 'completed' ? 'border border-white' : ''}`}
				onClick={onFilterCompleted('completed')}
			>
        Completed
			</span>
			<span
				className={`bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 hover:border hover:border-white cursor-pointer ${completed=== 'pending' ? 'border border-white' : ''}`}
				onClick={onFilterCompleted('pending')}
			>
        Pending
			</span>
		</div>
	);
}
