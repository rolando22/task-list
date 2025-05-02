import type { Task } from '@/modules/task/types';
import type { TasksState, TasksTypeAction } from '@/types';

export const tasksInitialState: TasksState = [];

const tasksReducerObject = (state: TasksState, action: TasksTypeAction) => ({
	['SET_TASKS']: () => {
		const newState = [...action.payload as TasksState];
		return [...newState];
	},
	['ADD_TASK']: () => {
		const newState = structuredClone(state);
		return [...newState, action.payload as Task];
	},
	['EDIT_TASK']: () => {
		const taskIndex = state.findIndex(task => task.id === (action.payload as Task).id);
		if (taskIndex === -1) return state;
		const newState = structuredClone(state);
		newState[taskIndex] = action.payload as Task;
		return newState;
	},
	['REMOVE_TASK']: () => {
		const newState = state.filter(task => task.id !== action.payload);
		return [...newState];
	},
	['RESET_TASKS']: () => tasksInitialState,
});

export const tasksReducer = (state: TasksState, action: TasksTypeAction) => {
	return tasksReducerObject(state, action)[action.type]() || state;
};
