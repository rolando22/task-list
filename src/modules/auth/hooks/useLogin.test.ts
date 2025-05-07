import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { act, renderHook, RenderHookResult, waitFor } from '@testing-library/react';
import { toast } from 'sonner';

import { useLogin } from './useLogin';
import { useUserStore } from './useUserStore';
import { authService } from '@/modules/auth/services/auth.service';
import { userMock } from '@/mocksData/const';

vi.mock('sonner', () => ({
	toast: {
		error: vi.fn(),
	},
}));

vi.mock('@/modules/auth/hooks/useUserStore', () => ({
	useUserStore: vi.fn(() => ({
		loginStore: vi.fn(),
		logoutStore: vi.fn(),
	})),
}));

vi.mock('@/modules/auth/services/auth.service', () => ({
	authService: {
		login: vi.fn(),
	},
}));

const authServiceMock = authService as { login: Mock };


describe('useLogin', () => { 
	let hook: RenderHookResult<ReturnType<typeof useLogin>, unknown>;

	beforeEach(() => { 
		hook = renderHook(() => useLogin());
	});
  
	afterEach(() => { 
		hook.unmount();
		vi.clearAllMocks();
	});

	it('should be isLoading false by default', () => {
		const { result } = hook;

		expect(result.current.isLoading).toBeFalsy();
	});

	it('should be isLoading true when login is called', async () => {
		const { result } = hook;

		act(() => { 
			result.current.login({ email: 'atuny0@sohu.com', password: '123456' });
		});
		
		await waitFor(() => { 
			expect(result.current.isLoading).toBeTruthy();
		});
	});

	it('should be login if login service return success', async () => {
		authServiceMock.login.mockResolvedValue(userMock);
		const loginStoreMock = vi.mocked(useUserStore).mock.results[0].value.loginStore;
    
		const { result } = hook;
    
		act(() => { 
			result.current.login({ email: 'atuny0@sohu.com', password: '123456' });
		});
		
		await waitFor(() => {
			expect(result.current.isLoading).toBeFalsy();
			expect(authServiceMock.login).toHaveBeenCalledTimes(1);
			expect(authServiceMock.login).toHaveBeenCalledWith({ email: 'atuny0@sohu.com', password: '123456' });
			expect(loginStoreMock).toHaveBeenCalledTimes(1);
			expect(loginStoreMock).toHaveBeenCalledWith(userMock);
		});
		
	});
	
	it('should be not login if login service return error', async () => {
		authServiceMock.login.mockRejectedValue(new Error('Server error'));
		const loginStoreMock = vi.mocked(useUserStore).mock.results[0].value.loginStore;
		
		const { result } = hook;
	
		act(() => {
			result.current.login({ email: 'atuny0@sohu.com', password: '123456' });
		});

		await waitFor(() => {
			expect(result.current.isLoading).toBeFalsy();
			expect(loginStoreMock).not.toHaveBeenCalled();
			expect(toast.error).toHaveBeenCalledTimes(1);
			expect(toast.error).toHaveBeenCalledWith('Server error');
		});
	});
});
