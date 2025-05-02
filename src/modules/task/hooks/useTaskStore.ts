import { useTasksContext } from '@/context';

import type { Task } from '@/modules/task/types';

export function useTaskStore() {
	const { tasks, dispatch } = useTasksContext();

	const setTasksStore = (tasksData: Task[]) => {
		dispatch({ type: 'SET_TASKS', payload: tasksData });
	};
  
	const getTaskStore = (id: Task['id']) => structuredClone(tasks).find(task => task.id === id);

	const addTaskStore = (newTask: Task) => {
		dispatch({ type: 'ADD_TASK', payload: newTask });
	};

	const editTaskStore = async (newTask: Task) => {
		dispatch({ type: 'EDIT_TASK', payload: newTask });
	};

	const removeTaskStore = async (id: Task['id']) => {
		dispatch({ type: 'REMOVE_TASK', payload: id });
	};

	const resetTasksStore = () => dispatch({ type: 'RESET_TASKS', payload: null });

	return {
		setTasksStore,
		getTaskStore,
		addTaskStore, 
		editTaskStore, 
		removeTaskStore,
		resetTasksStore,
	};
}