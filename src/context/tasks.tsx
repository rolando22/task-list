import React, { createContext, useContext, useReducer } from 'react';

import { tasksInitialState, tasksReducer } from '@/reducers';

import type { TasksState, TasksTypeAction } from '@/types';

interface ContextProps {
	tasks: TasksState
	dispatch: React.Dispatch<TasksTypeAction>
}

export const TasksContext = createContext<ContextProps>({} as ContextProps);

interface Props {
    children: React.ReactNode
}

export function TasksProvider({ children }: Props) {
	const [tasks, dispatch] = useReducer(tasksReducer, tasksInitialState);

	return (
		<TasksContext.Provider value={{
			tasks, 
			dispatch,
		}}>
			{children}
		</TasksContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTasksContext() {
	const tasksContext = useContext(TasksContext);

	if (tasksContext === undefined) throw new Error('useTasksContext must be used within a TasksProvider');

	return tasksContext;
}
