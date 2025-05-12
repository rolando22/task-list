import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { act, renderHook, RenderHookResult, waitFor } from '@testing-library/react';
import { toast } from 'sonner';

import { useRemoveTask } from './useRemoveTask';
import { taskService } from '@/modules/task/services/task.service';
import { useTaskStore } from './useTaskStore';

vi.mock('sonner', () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));

vi.mock('@/modules/task/hooks/useTaskStore', () => ({
	useTaskStore: vi.fn(() => ({
		removeTaskStore: vi.fn(),
	})),
}));

vi.mock('@/modules/task/services/task.service', () => ({
	taskService: {
		delete: vi.fn(),
	},
}));

const taskServiceMock = taskService as { getByUser: Mock; create: Mock; update: Mock; delete: Mock };

describe('useRemoveTask', () => {
	let hook: RenderHookResult<ReturnType<typeof useRemoveTask>, unknown>;
  
	beforeEach(() => { 
		hook = renderHook(() => useRemoveTask());
	});
  
	afterEach(() => {
		hook.unmount();
		vi.clearAllMocks();
	});

	it('should be isLoading false by default', () => {
		const { result } = hook;

		expect(result.current.isLoading).toBeFalsy();
	});
  
	it('should be isLoading true when removeTask is called', async () => {
		const { result } = hook;
		const taskMock = { id: 'taskId', title: 'title', description: 'description', completed: false };
		taskServiceMock.delete.mockResolvedValue(taskMock);

		act(() => {
			result.current.removeTask(taskMock.id);
		});
    
		await waitFor(() => {
			expect(result.current.isLoading).toBeTruthy();
		});
	});
  
	it('should remove task when removeTask is called', async () => {
		const { result } = hook;
		const taskMock = { id: 'taskId', title: 'title', description: 'description', completed: false };
		taskServiceMock.delete.mockResolvedValue(taskMock);
		const removeTaskStoreMock = vi.mocked(useTaskStore).mock.results[0].value.removeTaskStore;
    
		act(() => {
			result.current.removeTask(taskMock.id);
		});
    
		await waitFor(() => {
			expect(result.current.isLoading).toBeFalsy();
			expect(taskServiceMock.delete).toHaveBeenCalledTimes(1);
			expect(taskServiceMock.delete).toHaveBeenLastCalledWith(taskMock.id);
			expect(removeTaskStoreMock).toHaveBeenCalledTimes(1);
			expect(removeTaskStoreMock).toHaveBeenCalledWith(taskMock.id);
			expect(toast.success).toHaveBeenCalledTimes(1);
			expect(toast.success).toHaveBeenCalledWith('Task deleted');
		});
	});
  
	it('should show error when removeTask fails', async () => {
		const { result } = hook;
		const taskMock = { id: 'taskId', title: 'title', description: 'description', completed: false };
		const errorMessage = 'Server error';
		taskServiceMock.delete.mockRejectedValue(new Error(errorMessage));
    
		act(() => {
			result.current.removeTask(taskMock.id);
		});
    
		await waitFor(() => {
			expect(result.current.isLoading).toBeFalsy();
			expect(taskServiceMock.delete).toHaveBeenCalledTimes(1);
			expect(taskServiceMock.delete).toHaveBeenLastCalledWith(taskMock.id);
			expect(toast.error).toHaveBeenCalledTimes(1);
			expect(toast.error).toHaveBeenCalledWith(errorMessage);
		});
	});
});
