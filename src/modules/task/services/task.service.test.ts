import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';

import { handlers } from '@/mocks/handlers';
import { server } from '@/mocks/server';
import { taskService } from './task.service';
import taskResponse from '@/mocksData/changeTasks.json';

vi.mock('@/modules/core/services/token.service', () => ({
	tokenService: {
		get: vi.fn(() => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
	},
}));

describe('TaskService', () => {
	beforeAll(() => {
		server.listen();
	});
  
	afterEach(() => {
		server.restoreHandlers();
	});
  
	afterAll(() => {
		server.close();
	});
  
	describe('getByUser', () => {
		it('should return tasks if response is success', async () => {
			server.use(handlers[3]);
      
			const tasks = await taskService.getByUser({});   
      
			expect(tasks).toHaveLength(7);
		});
		
		it('should return Server error if response is 5xx', async () => {
			server.use(handlers[4]);
	
			await expect(taskService.getByUser({})).rejects.toThrow('Server error');
		});
	});

	describe('create', () => {
		it('should create task if response is success', async () => {
			server.use(handlers[5]);
			const taskMock = {
				title: taskResponse.data.title,
				description: taskResponse.data.description,
				completed: false,
				userId: '1',
			};
			const taskResponseMock = {
				id: taskResponse.data.id,
				title: taskResponse.data.title,
				description: taskResponse.data.description,
				completed: false,
			};
			
			const task = await taskService.create(taskMock);
			
			expect(task).toEqual(taskResponseMock);
		});
		
		it('should return Server error if response is 5xx', async () => {
			server.use(handlers[6]);
			const taskMock = {
				title: taskResponse.data.title,
				description: taskResponse.data.description,
				completed: false,
				userId: '1',
			};

			await expect(taskService.create(taskMock)).rejects.toThrow('Server error');
		});
	});

	describe('update', () => { 
		it('should update task if response is success', async () => {
			server.use(handlers[7]);
			const taskMock = {
				title: taskResponse.data.title,
				description: taskResponse.data.description,
				completed: false,
			};
			const taskResponseMock = {
				id: taskResponse.data.id,
				title: taskResponse.data.title,
				description: taskResponse.data.description,
				completed: false,
			};

			const task = await taskService.update(taskResponseMock.id, taskMock);
			
			expect(task).toEqual(taskResponseMock);
		});

		it('should return Server error if response is 5xx', async () => {
			server.use(handlers[8]);

			const taskMock = {
				title: taskResponse.data.title,
				description: taskResponse.data.description,
				completed: false,
			};
			const taskResponseMock = {
				id: taskResponse.data.id,
				title: taskResponse.data.title,
				description: taskResponse.data.description,
				completed: false,
			};

			await expect(taskService.update(taskResponseMock.id, taskMock)).rejects.toThrow('Server error');
		});
	});
	
	describe('delete', () => {
		it('should delete task if response is success', async () => {
			server.use(handlers[9]);
			const taskResponseMock = {
				id: taskResponse.data.id,
				title: taskResponse.data.title,
				description: taskResponse.data.description,
				completed: false,
			};

			const task = await taskService.delete(taskResponseMock.id);

			expect(task).toEqual(taskResponseMock);
		});

		it('should return Server error if response is 5xx', async () => {
			server.use(handlers[10]);

			await expect(taskService.delete(taskResponse.data.id)).rejects.toThrow('Server error');
		});
	});
});
