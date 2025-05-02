import type TasksResponse from '@/mocksData/getTasks.json';
import type TaskChangeResponse from '@/mocksData/changeTasks.json';

import type { TasksState } from '@/types';
import type { Task } from '@/modules/task/types';

export function formaterTasks(data: typeof TasksResponse): TasksState {
	return data.map(task => ({
		id: task.id,
		title: task.title,
		description: task.description,
		completed: task.completed,
	}));
}

export function formaterTask({ data }: typeof TaskChangeResponse): Task {
	return {
		id: data.id,
		title: data.title,
		description: data.description,
		completed: data.completed,
	};
}
