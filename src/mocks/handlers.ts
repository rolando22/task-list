import { http, HttpResponse } from 'msw';

import { config } from '@/config';
import authLoginResponse from '@/mocksData/authLogin.json';
import tasksResponse from '@/mocksData/getTasks.json';
import taskResponse from '@/mocksData/changeTasks.json';

const { apiUrl } = config;

export const handlers = [
	// Auth
	http.post(`${apiUrl}/api/auth/login`, () => {
		return HttpResponse.json({ data: authLoginResponse, error: '' }, {
			status: 200,
		});
	}),
	http.post(`${apiUrl}/api/auth/login`, () => {
		return HttpResponse.json({ data: '', error: 'Unauthorized' }, {
			status: 401,
			statusText: 'Unauthorized',
		});
	}),
	http.post(`${apiUrl}/api/auth/login`, () => {
		return HttpResponse.json({ data: '', error: '' }, {
			status: 500,
			statusText: 'Internal Server Error',
		});
	}),
	//Task
	http.get(`${apiUrl}/api/tasks`, () => {
		return HttpResponse.json({ data: tasksResponse, error: '' }, {
			status: 200,
		});
	}),
	http.get(`${apiUrl}/api/tasks`, () => {
		return HttpResponse.json({ data: '', error: '' }, {
			status: 500,
			statusText: 'Internal Server Error',
		});
	}),
	http.post(`${apiUrl}/api/tasks`, () => {
		return HttpResponse.json({ data: taskResponse.data, message: 'Task created' }, {
			status: 200,
		});
	}),
	http.post(`${apiUrl}/api/tasks`, () => {
		return HttpResponse.json({ data: '', error: '' }, {
			status: 500,
			statusText: 'Internal Server Error',
		});
	}),
	http.put(`${apiUrl}/api/tasks/${taskResponse.data.id}`, () => {
		return HttpResponse.json({ data: taskResponse.data, message: 'Task updated' }, {
			status: 201,
		});
	}),
	http.put(`${apiUrl}/api/tasks/${taskResponse.data.id}`, () => {
		return HttpResponse.json({ data: '', error: '' }, {
			status: 500,
			statusText: 'Internal Server Error',
		});
	}),
	http.delete(`${apiUrl}/api/tasks/${taskResponse.data.id}`, () => {
		return HttpResponse.json({ data: taskResponse.data, message: 'Task deleted' }, {
			status: 200,
		});
	}),
	http.delete(`${apiUrl}/api/tasks/${taskResponse.data.id}`, () => {
		return HttpResponse.json({ data: '', error: '' }, {
			status: 500,
			statusText: 'Internal Server Error',
		});
	}),
];
