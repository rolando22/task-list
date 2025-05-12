import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { act, renderHook, RenderHookResult, waitFor } from '@testing-library/react';
import { toast } from 'sonner';

import { useGetAllTasks } from './useGetAllTasks';
import { taskService } from '@/modules/task/services/task.service';
import { tasksMock } from '@/mocksData/const';
import { useTaskStore } from './useTaskStore';

vi.mock('sonner', () => ({ 
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));

vi.mock('@/modules/task/hooks/useTaskStore', () => ({ 
	useTaskStore: vi.fn(() => ({
		setTasksStore: vi.fn(),
	})),
}));

vi.mock('@/modules/task/services/task.service', () => ({
	taskService: {
		getByUser: vi.fn(),
	},
}));

const taskServiceMock = taskService as { getByUser: Mock; create: Mock; update: Mock; delete: Mock };

describe('useGetAllTasks', () => { 
	let hook: RenderHookResult<ReturnType<typeof useGetAllTasks>, unknown>;

	beforeEach(() => { 
		hook = renderHook(() => useGetAllTasks());
	});
  
	afterEach(() => { 
		hook.unmount();
		vi.clearAllMocks();
	});

	it('should be isLoading false by default', () => { 
		const { result } = hook;

		expect(result.current.isLoading).toBeFalsy();
	});

	it('should be isLoading true when getTasks is called', async () => { 
		const { result } = hook;

		act(() => { 
			result.current.getTasks({});
		});

		await waitFor(() => { 
			expect(result.current.isLoading).toBeTruthy();
		});
	});

	it('should get tasks when getTasks is called', async () => { 
		const { result } = hook;
		taskServiceMock.getByUser.mockResolvedValue(tasksMock);
		const setTasksStoreMock = vi.mocked(useTaskStore).mock.results[0].value.setTasksStore;

		act(() => { 
			result.current.getTasks({});
		});

		await waitFor(() => {
			expect(result.current.isLoading).toBeFalsy();
			expect(taskServiceMock.getByUser).toHaveBeenCalledTimes(1);
			expect(taskServiceMock.getByUser).toHaveBeenCalledWith({ completed: '' });
			expect(setTasksStoreMock).toHaveBeenCalledTimes(1);
			expect(setTasksStoreMock).toHaveBeenCalledWith(tasksMock);
		});
	});

	it('should show error when getTasks fails', async () => { 
		const { result } = hook;
		const errorMessage = 'Server error';
		taskServiceMock.getByUser.mockRejectedValue(new Error(errorMessage));

		act(() => { 
			result.current.getTasks({});
		});

		await waitFor(() => { 
			expect(result.current.isLoading).toBeFalsy();
			expect(taskServiceMock.getByUser).toHaveBeenCalledTimes(1);
			expect(taskServiceMock.getByUser).toHaveBeenCalledWith({ completed: '' });
			expect(toast.error).toHaveBeenCalledTimes(1);
			expect(toast.error).toHaveBeenCalledWith(errorMessage);
		});
	});
});
