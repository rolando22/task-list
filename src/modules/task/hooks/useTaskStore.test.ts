import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, renderHook, RenderHookResult, waitFor } from '@testing-library/react';

import { useTaskStore } from './useTaskStore';
import { useTasksContext } from '@/context';
import { tasksMock } from '@/mocksData/const';

import type { Task } from '@/modules/task/types';

vi.mock('@/context', () => ({
	useTasksContext: vi.fn(() => ({
		tasks: tasksMock,
		dispatch: vi.fn(),
	}))
}));

describe('useTaskStore', () => {
	let hook: RenderHookResult<ReturnType<typeof useTaskStore>, unknown>;
  
	beforeEach(() => {
		hook = renderHook(() => useTaskStore());
	});
  
	afterEach(() => {
		hook.unmount();
		vi.clearAllMocks();
	});

	it('should set tasks in store', async () => {
		const { result } = hook;
		const dispatchMock = vi.mocked(useTasksContext).mock.results[0].value.dispatch;

		act(() => {
			result.current.setTasksStore(tasksMock);
		});
    
		await waitFor(() => {
			expect(dispatchMock).toHaveBeenCalledTimes(1);
			expect(dispatchMock).toHaveBeenCalledWith({ type: 'SET_TASKS', payload: tasksMock });
		});
	});
  
	it('should return finded task', async () => {
		const { result } = hook;
		let task: Task | undefined;

		act(() => {
			task = result.current.getTaskStore(tasksMock[0].id);
		});
    
		await waitFor(() => {
			expect(task).toEqual(tasksMock[0]);
		});
	});
  
	it('should add task in store', async () => {
		const { result } = hook;
		const taskMock = { id: 'taskId', title: 'title', description: 'description', completed: false };
		const dispatchMock = vi.mocked(useTasksContext).mock.results[0].value.dispatch;
    
		act(() => {
			result.current.addTaskStore(taskMock);
		});
    
		await waitFor(() => {
			expect(dispatchMock).toHaveBeenCalledTimes(1);
			expect(dispatchMock).toHaveBeenCalledWith({ type: 'ADD_TASK', payload: taskMock });
		});
	});
  
	it('should edit task in store', async () => {
		const { result } = hook;
		const taskMock = { id: 'taskId', title: 'title', description: 'description', completed: false };
		const dispatchMock = vi.mocked(useTasksContext).mock.results[0].value.dispatch;
    
		act(() => {
			result.current.editTaskStore(taskMock);
		});
    
		await waitFor(() => {
			expect(dispatchMock).toHaveBeenCalledTimes(1);
			expect(dispatchMock).toHaveBeenCalledWith({ type: 'EDIT_TASK', payload: taskMock });
		});
	});
  
	it('should remove task in store', async () => {
		const { result } = hook;
		const taskMock = { id: 'taskId', title: 'title', description: 'description', completed: false };
		const dispatchMock = vi.mocked(useTasksContext).mock.results[0].value.dispatch;
    
		act(() => {
			result.current.removeTaskStore(taskMock.id);
		});
    
		await waitFor(() => {
			expect(dispatchMock).toHaveBeenCalledTimes(1);
			expect(dispatchMock).toHaveBeenCalledWith({ type: 'REMOVE_TASK', payload: taskMock.id });
		});
	});
  
	it('should reset tasks in store', async () => {
		const { result } = hook;
		const dispatchMock = vi.mocked(useTasksContext).mock.results[0].value.dispatch;
    
		act(() => {
			result.current.resetTasksStore();
		});
    
		await waitFor(() => {
			expect(dispatchMock).toHaveBeenCalledTimes(1);
			expect(dispatchMock).toHaveBeenCalledWith({ type: 'RESET_TASKS', payload: null });
		});
	});
});
