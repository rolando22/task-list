import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { act, renderHook, RenderHookResult, waitFor } from '@testing-library/react';

import { useAddTask } from './useAddTask';
import { taskService } from '@/modules/task/services/task.service';
import { useTaskStore } from './useTaskStore';
import { useUserContext } from '@/context';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));

vi.mock('@/context/user', () => ({
	useUserContext: vi.fn(() => ({
		user: { id: 'userId' },
	})),
}));

vi.mock('@/modules/task/services/task.service', () => ({
	taskService: {
		create: vi.fn(),
	},
}));

vi.mock('@/modules/task/hooks/useTaskStore', () => ({
	useTaskStore: vi.fn(() => ({
		addTaskStore: vi.fn(),
	})),
}));

const taskServiceMock = taskService as { getByUser: Mock; create: Mock; update: Mock; delete: Mock };
const useUserContextMock = useUserContext as Mock;

describe('useAddTask', () => { 
	let hook: RenderHookResult<ReturnType<typeof useAddTask>, unknown>;
	const userMock = { user: { id: 'userId' } };
  
	beforeEach(() => {
		hook = renderHook(() => useAddTask());
	});

	afterEach(() => {
		hook.unmount();
		vi.clearAllMocks();
	});

	it('should be isLoading false by default', () => { 
		const { result } = hook;

		expect(result.current.isLoading).toBeFalsy();
	});
  
	it('should be isLoading true when addTask is called', async () => {
		const { result } = hook;

		act(() => {
			result.current.addTask('title', 'description');
		});
    
		await waitFor(() => {
			expect(result.current.isLoading).toBeTruthy();
		});
	});
  
	it('should create task when addTask is called', async () => {
		const { result } = hook;
		useUserContextMock.mockReturnValue(userMock);
		const taskData = { id: '1', title: 'title', description: 'description', completed: false, userId: userMock.user.id };
		taskServiceMock.create.mockResolvedValue(taskData);
		const addTaskStoreMock = vi.mocked(useTaskStore).mock.results[0].value.addTaskStore;

		act(() => {
			result.current.addTask(taskData.title, taskData.description);
		});
    
		await waitFor(() => {
			expect(result.current.isLoading).toBeFalsy();
			expect(taskServiceMock.create).toHaveBeenCalledTimes(1);
			expect(taskServiceMock.create).toHaveBeenCalledWith({ title: taskData.title, description: taskData.description, completed: taskData.completed, userId: userMock.user.id });
			expect(addTaskStoreMock).toHaveBeenCalledTimes(1);
			expect(addTaskStoreMock).toHaveBeenCalledWith(taskData);
			expect(toast.success).toHaveBeenCalledTimes(1);
			expect(toast.success).toHaveBeenCalledWith('Task created');
		});
	});

	it('should show error toast when addTask fails', async () => {
		const { result } = hook;
		const errorMessage = 'Server error';
		taskServiceMock.create.mockRejectedValue(new Error(errorMessage));

		act(() => {
			result.current.addTask('title', 'description');
		});
		
		await waitFor(() => {
			expect(result.current.isLoading).toBeFalsy();
			expect(taskServiceMock.create).toHaveBeenCalledTimes(1);
			expect(taskServiceMock.create).toHaveBeenCalledWith({ title: 'title', description: 'description', completed: false, userId: userMock.user.id });
			expect(toast.error).toHaveBeenCalledTimes(1);
			expect(toast.error).toHaveBeenCalledWith(errorMessage);
		});
	});

});
