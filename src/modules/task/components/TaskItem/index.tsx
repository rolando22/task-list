import { CompleteIcon, DeleteIcon, EditIcon } from '@/modules/task/components';

import type { ToggleModal } from '@/modules/core/types';
import type { Task } from '@/modules/task/types';

interface Props {
	id: Task['id']
	title: string
	description: string
	completed: boolean
	onMutateDeleteTask: ({ id }: { id: Task['id'] }) => () => void
	onMutateToggleCompletedTask: () => void
	toggle: (newState: ToggleModal) => void
}

export function TaskItem({ id, title, description, completed, onMutateDeleteTask, onMutateToggleCompletedTask, toggle }: Props) {
	const handlerToggleEditTask = () => toggle({ taskId: id, type: 'edit', open: true });

	return (
		<li className='rounded-xl bg-[#293143] relative flex flex-col justify-center items-center gap-2 mt-6 py-6'>
			<CompleteIcon 
				data-testid='complete-icon'
				completed={completed} 
				onComplete={onMutateToggleCompletedTask} 
			/>
			<p className={`
					mx-10 w-[calc(100%-100px)] text-lg font-bold
					${completed === true ? 'line-through decoration-[#171b26]' : ''}
				`}>
				{title}
			</p>
			<p className={`
					mx-10 w-[calc(100%-100px)] text-lg font-extralight
					${completed === true ? 'line-through decoration-[#171b26]' : ''}
				`}>
				{description}
			</p>
			<EditIcon data-testid='edit-icon' onEdit={handlerToggleEditTask} /> 
			<DeleteIcon data-testid='delete-icon' onDelete={onMutateDeleteTask({ id })} />
		</li>
	);
}
