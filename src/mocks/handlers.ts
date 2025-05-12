import { http, HttpResponse } from 'msw';

import { config } from '@/config';
import authLoginResponse from '@/mocksData/authLogin.json';

const { apiUrl } = config;

export const handlers = [
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
];
