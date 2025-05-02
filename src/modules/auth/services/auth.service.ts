import { config } from '@/config';
import { formaterUser } from '@/modules/auth/adapters';

import type { UserState } from '@/types';
import type { Login } from '@/modules/auth/types';
import type LoginResponse from '@/mocksData/authLogin.json';

const { apiUrl } = config;

export const authService = {
	login: async (loginData: Login): Promise<UserState> => {
		const response = await fetch(`${apiUrl}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginData),
		});

		const { data, error }: { data: typeof LoginResponse, error: string } = await response.json();
		
		if (response.status === 401) throw new Error(error);
		if (!response.ok) throw new Error('Server error');

		const user = formaterUser(data);

		return user;
	},
};