import { useRef } from 'react';
import { useFormik } from 'formik';

import { useTaskStore } from '@/modules/task/hooks';
import { CreateTaskSchema } from '@/modules/task/schemas';

import type { ToggleModal } from '@/modules/core/types';
import type { CreateTaskDTO, Task } from '@/modules/task/types';

interface Props {
	type: 'new' | 'edit'
	taskId?: Task['id']
	onMutateTask: (task: Task) => void
	toggle: (newState: Partial<ToggleModal>) => void
}

export function TaskForm({ taskId = '', type, onMutateTask, toggle }: Props) {
	const { getTaskStore } = useTaskStore();

	const taskRef = useRef<Task>((getTaskStore(taskId) || { id: taskId, title: '', description: '', completed: false, userId: '' }));

	const formik = useFormik({
		initialValues: {
			title: taskRef.current.title,
			description: taskRef.current.description,
		} as CreateTaskDTO,
		validationSchema: CreateTaskSchema,
		onSubmit: ({ title, description }) => {
			onMutateTask({ ...taskRef.current, title, description });
			handlerOnClickToggleModal();
		},
	});

	const handlerOnClickToggleModal = () => toggle({});

	return (
		<div className='flex flex-col justify-center items-center bg-[#171b26] rounded-3xl px-8 py-10 gap-8'>
			<h2 className='text-center font-bold text-xl text-[#fff]'>
				{type === 'new' ? 'New Task' : 'Edit Task'}
			</h2>
			<form 
				className='w-[90%] max-w-xs bg-[#171b26] rounded-3xl grid justify-center content-center gap-4'
				onSubmit={formik.handleSubmit}
			>
				<div>
					<input
						id='title' 
						name='title' 
						className='bg-[#293143] border-[2px] border-[#202329] rounded-xl text-[#fff] text-xl text-center p-3 w-full placeholder:text-[#4f6b7f] placeholder:font-normal focus:outline-[#61dafa]'
						type='text'
						value={formik.values.title}
						onChange={formik.handleChange}
						placeholder='Write Task title here'
					/>
					{formik.touched.title && <span className='text-red-500 text-sm'>{formik.errors.title}</span>}
				</div>
				<div>
					<textarea 
						id='description' 
						name='description' 
						className='bg-[#293143] border-[2px] border-[#202329] rounded-xl text-[#fff] text-xl text-center p-3 h-32 w-full placeholder:text-[#4f6b7f] placeholder:font-normal focus:outline-[#61dafa]'
						value={formik.values.description}
						onChange={formik.handleChange}
						placeholder='Write Task description here'
					/>
					{formik.touched.description && <span className='text-red-500 text-sm'>{formik.errors.description}</span>}
				</div>
				<div className='flex justify-between items-center w-full gap-4'>
					<button
						type='button'
						className='cursor-pointer inline-block text-xl font-normal w-32 h-10 rounded-lg border-none bg-[#293143]'
						onClick={handlerOnClickToggleModal}
					>
						Cancel
					</button>
					<button
						type='submit'
						className='cursor-pointer inline-block text-xl font-normal w-32 h-10 rounded-lg border-none bg-[#47c2be]'
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}
