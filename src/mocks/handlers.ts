import { http, HttpResponse } from 'msw';

import { config } from '@/config';
import authLoginResponse from '@/mocksData/authLogin.json';

const { apiUrl } = config;

export const handlers = [
	http.get(`${apiUrl}/api/auth/login`, () => {
		return HttpResponse.json({ data: authLoginResponse, error: '' });
	})
];
