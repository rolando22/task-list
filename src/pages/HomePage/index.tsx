import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LoadScreen, Modal } from '@/modules/core/components';
import { CreateTaskButton, TaskCounter, TaskFilters, TaskForm, TaskList } from '@/modules/task/components';

import { useAddTask, useEditTask, useGetAllTasks, useRemoveTask } from '@/modules/task/hooks';

import type { ToggleModal } from '@/modules/core/types';
import type { TaskFilters as TaskFiltersType, Task } from '@/modules/task/types';

export default function HomePage() {
	const [toggleModal, setToggleModal] = useState<ToggleModal>({ taskId: '', type: 'new', open: false });

	const [searchParams, setSearchParams] = useSearchParams();
	const completed = (searchParams.get('completed') || '') as TaskFiltersType['completed'];

	const { getTasks, isLoading: isLoadingGetAllTasks } = useGetAllTasks();
	const { addTask, isLoading: isLoadingAddTask } = useAddTask();
	const { editTask, isLoading: isLoadingEditTask } = useEditTask();
	const { removeTask, isLoading: isLoadingRemoveTask } = useRemoveTask();

	useEffect(() => {
		getTasks({ completed });
	}, [completed, getTasks]);

	const toggle = ({ taskId = '', type = 'new', open = false }: Partial<ToggleModal>) => {
		setToggleModal({ taskId, type, open });
	};

	const onFilterCompleted = (completed: TaskFiltersType['completed']) => () => {
		searchParams.set('completed', completed);
		setSearchParams(searchParams);
	};

	const onMutateTask = ({ id, title, description, completed }: Task) => {
		toggleModal.type === 'new' ? addTask(title, description) : editTask({ id, title, description, completed });
	};

	const onMutateToggleCompletedTask = ({ id, title, description, completed }: Task) => () => { 
		editTask({ id, title, description, completed: !completed });
	};

	const onMutateDeleteTask = ({ id }: { id: Task['id'] }) => () => { 
		removeTask(id);
	};

	return (
		<>
			<header className='my-0 mx-auto py-12 w-[75%] grid gap-6'>
				<TaskCounter />
				<section className='flex flex-col justify-center items-center gap-5'>
					<CreateTaskButton toggle={toggle} />
					<TaskFilters onFilterCompleted={onFilterCompleted} />
				</section>
			</header>
			<main className='my-0 mx-auto w-[75%] grid'>
				<TaskList
					isLoading={isLoadingGetAllTasks}
					onMutateDeleteTask={onMutateDeleteTask}
					onMutateToggleCompletedTask={onMutateToggleCompletedTask}
					toggle={toggle}
				/>
			</main>

			{toggleModal.open && 
				<Modal>
					<TaskForm 
						type={toggleModal.type}
						taskId={toggleModal.taskId}
						onMutateTask={onMutateTask}
						toggle={toggle} 
					/>
				</Modal>
			}

			{(isLoadingAddTask || isLoadingEditTask || isLoadingRemoveTask) && (<LoadScreen />)}
		</>
	);
}
