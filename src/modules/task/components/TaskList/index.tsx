import { LoadScreen } from '@/modules/core/components';
import { TaskItem } from '@/modules/task/components';

import { useTasksContext } from '@/context';

import type { Task } from '@/modules/task/types';
import type { ToggleModal } from '@/modules/core/types';

interface Props {
	isLoading: boolean
	onMutateDeleteTask: ({ id }: { id: Task['id'] }) => () => void
	onMutateToggleCompletedTask: ({ id, title, description, completed }: Task) => () => void
	toggle: (newState: ToggleModal) => void
}

export function TaskList({ isLoading, onMutateDeleteTask, onMutateToggleCompletedTask, toggle }: Props) {
	const { tasks } = useTasksContext();

	return (
		<>
			{isLoading && <LoadScreen />}
			{!isLoading && tasks.length === 0 && (
				<div className='flex justify-center items-center'>
					<p className='text-2xl text-gray-500'>No tasks available</p>
				</div>
			)}
			{!isLoading && tasks.length > 0 && (
				<ul className='m-0 px-0 pt-0 pb-14'>
					{[...tasks].reverse().map(task => 
						<TaskItem 
							key={task.id} 
							id={task.id}
							title={task.title}
							description={task.description}
							completed={task.completed}
							onMutateDeleteTask={onMutateDeleteTask}
							onMutateToggleCompletedTask={onMutateToggleCompletedTask({ ...task })}
							toggle={toggle}
						/>
					)}
				</ul>
			)}
		</>
	);
}
