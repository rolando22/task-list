import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';

import { server } from '@/mocks/server';
import { handlers } from '@/mocks/handlers';
import { authService } from './auth.service';
import { UserState } from '@/types';

describe('AuthService', () => {
	const loginData = { email: 'atuny0@sohu.com', password: '12345678' };

	beforeAll(() => {
		server.listen();
	});
  
	afterEach(() => {
		server.restoreHandlers();
	});

	afterAll(() => {
		server.close();
	});

	it('should return session if response is success', async () => {
		server.use(handlers[0]);
		const expectedSession: UserState = {
			id: '1',
			firstName: 'Terry',
			lastName: 'Medhurst',
			email: 'atuny0@sohu.com',
			username: 'atuny0',
			image: 'https://robohash.org/hicveldicta.png',
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImF0dW55MCIsImlhdCI6MTczNTUzMDA5NCwiZXhwIjoxODIxOTMwMDk0fQ.WE1THcn7Gey9NY7Q_qnyWZnI_scMZLVzGAJRAQDh9Dk',
		};
    
		const session = await authService.login(loginData);
    
		expect(session).toEqual(expectedSession);
	});
  
	it('should return Unauthorized if response is 401', async () => { 
		server.use(handlers[1]);

		await expect(authService.login(loginData)).rejects.toThrow('Unauthorized');
	});
  
	it('should return Server error if response is 5xx', async () => {
		server.use(handlers[2]);

		await expect(authService.login(loginData)).rejects.toThrow('Server error');
	});
});
