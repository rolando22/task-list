import { config } from '@/config';
import { tokenService } from '@/modules/core/services/token.service';
import { formaterTask, formaterTasks } from '@/modules/task/adapters';

import type { Task, TaskFilters } from '@/modules/task/types';
import type TasksResponse from '@/mocksData/getTasks.json';
import type TaskChangeResponse from '@/mocksData/changeTasks.json';

const { apiUrl } = config;

export const taskService = {
	getByUser: async ({ completed = '' }: Partial<TaskFilters>) => {
		const params = new URLSearchParams();

		if (completed !== '') {
			params.append('completed', completed);
		}

		const url = `${apiUrl}/api/tasks?${params.toString()}`;
		const token = tokenService.get();

		if (!token) return [];
		
		const response = await fetch(url, {
			method: 'GET',
			headers: { 
				'Authorization': `Bearer ${token}`, 
			},
		});

		if (!response.ok) throw new Error('Server error');

		const { data }: { data: typeof TasksResponse } = await response.json();
		const tasks = formaterTasks(data);

		return tasks;
	},
	create: async (newTask: Pick<Task, 'title' | 'description' | 'completed' | 'userId'>) => {
		const token = tokenService.get();
		const response = await fetch(`${apiUrl}/api/tasks`, {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`, 
			},
			body: JSON.stringify(newTask),
		});

		if (!response.ok) throw new Error('Server error');

		const data: typeof TaskChangeResponse = await response.json();
		const task = formaterTask(data);

		return task;
	},
	update: async (taskId: Task['id'], newTask: Pick<Task, 'title' | 'description' | 'completed' | 'userId'>) => {
		const token = tokenService.get();
		const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
			method: 'PUT',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			body: JSON.stringify(newTask),
		});

		if (!response.ok) throw new Error('Server error');

		const data: typeof TaskChangeResponse = await response.json();
		const task = formaterTask(data);

		return task;
	},
	delete: async (id: Task['id']) => {
		const token = tokenService.get();
		const response = await fetch(`${apiUrl}/api/tasks/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		});
		
		if (!response.ok) throw new Error('Server error');

		const data: typeof TaskChangeResponse = await response.json();
		const task = formaterTask(data);

		return task;
	},
};
