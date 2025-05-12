import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { act, renderHook, RenderHookResult, waitFor } from '@testing-library/react';
import { toast } from 'sonner';

import { useEditTask } from './useEditTask';
import { taskService } from '@/modules/task/services/task.service';
import { useUserContext } from '@/context';
import { useTaskStore } from './useTaskStore';

vi.mock('sonner', () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));

vi.mock('@/context', () => ({
	useUserContext: vi.fn(() => ({
		user: { id: 'userId' },
	})),
}));

vi.mock('@/modules/task/hooks/useTaskStore', () => ({
	useTaskStore: vi.fn(() => ({
		editTaskStore: vi.fn(),
	})),
}));

vi.mock('@/modules/task/services/task.service', () => ({
	taskService: {
		update: vi.fn(),
	},
}));

const taskServiceMock = taskService as { getByUser: Mock; create: Mock; update: Mock; delete: Mock };
const useUserContextMock = useUserContext as Mock;

describe('useEditTask', () => { 
	let hook: RenderHookResult<ReturnType<typeof useEditTask>, unknown>;
	const userMock = { user: { id: 'userId' } };

	beforeEach(() => {
		hook = renderHook(() => useEditTask());
	});

	afterEach(() => {
		hook.unmount();
		vi.clearAllMocks();
	});

	it('should be isLoading false by default', () => { 
		const { result } = hook;

		expect(result.current.isLoading).toBeFalsy();
	});
  
	it('should be isLoading true when editTask is called', async () => { 
		const { result } = hook;

		act(() => { 
			result.current.editTask({ id: 'taskId', title: 'title', description: 'description', completed: false });
		});

		await waitFor(() => { 
			expect(result.current.isLoading).toBeTruthy();
		});
	});
  
	it('should edit task when editTask is called', async () => { 
		const { result } = hook;
		useUserContextMock.mockReturnValue(userMock);
		const taskMock = { id: 'taskId', title: 'title', description: 'description', completed: false };
		taskServiceMock.update.mockResolvedValue(taskMock);
		const editTaskStoreMock = vi.mocked(useTaskStore).mock.results[0].value.editTaskStore;

		act(() => { 
			result.current.editTask(taskMock);
		});

		await waitFor(() => { 
			expect(result.current.isLoading).toBeFalsy();
			expect(taskServiceMock.update).toHaveBeenCalledTimes(1);
			expect(taskServiceMock.update).toHaveBeenCalledWith(
				taskMock.id,
				{
					title: taskMock.title,
					description: taskMock.description,
					completed: taskMock.completed,
					userId: userMock.user.id,
				}
			);
			expect(editTaskStoreMock).toHaveBeenCalledTimes(1);
			expect(editTaskStoreMock).toHaveBeenCalledWith(taskMock);
			expect(toast.success).toHaveBeenCalledTimes(1);
			expect(toast.success).toHaveBeenCalledWith('Task updated');
		}); 

	});
  
	it('should show error when editTask fails', async () => { 
		const { result } = hook;
		const errorMessage = 'Server error';
		taskServiceMock.update.mockRejectedValue(new Error(errorMessage));
		const taskMock = { id: 'taskId', title: 'title', description: 'description', completed: false };

		act(() => { 
			result.current.editTask(taskMock);
		});

		await waitFor(() => { 
			expect(result.current.isLoading).toBeFalsy();
			expect(taskServiceMock.update).toHaveBeenCalledTimes(1);
			expect(taskServiceMock.update).toHaveBeenCalledWith(
				taskMock.id,
				{
					title: taskMock.title,
					description: taskMock.description,
					completed: taskMock.completed,
					userId: userMock.user.id,
				}
			);
			expect(toast.error).toHaveBeenCalledTimes(1);
			expect(toast.error).toHaveBeenCalledWith(errorMessage);
		});
	});
});
