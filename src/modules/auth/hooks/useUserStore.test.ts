import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { act, renderHook, RenderHookResult, waitFor } from '@testing-library/react';

import { useUserStore } from './useUserStore';
import { useUserContext } from '@/context';
import { tokenService } from '@/modules/core/services/token.service';
import { userMock } from '@/mocksData/const';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
	toast: {
		message: vi.fn(),
	},
}));

vi.mock('@/context', async () => {
	const actual = (await vi.importActual('@/context'));
	return {
		...actual,
		useUserContext: vi.fn(() => ({
			dispatch: vi.fn(),
		})),
	};
});

vi.mock('@/modules/core/services/token.service', () => ({
	tokenService: {
		set: vi.fn(),
		get: vi.fn(),
	},
}));

const tokenServiceMock = tokenService as { set: Mock, get: Mock };

describe('useUserStore', () => { 
	let hook: RenderHookResult<ReturnType<typeof useUserStore>, unknown>;
  
	beforeEach(() => { 
		hook = renderHook(() => useUserStore());
	});
  
	afterEach(() => {
		hook.unmount();
		vi.clearAllMocks();
	});
  
	it('should login session in store', async () => { 
		const { result } = hook;
		const dispatchMock = vi.mocked(useUserContext).mock.results[0].value.dispatch;

		act(() => {
			result.current.loginStore(userMock);
		});
    
		await waitFor(() => {
			expect(dispatchMock).toHaveBeenCalledTimes(1);
			expect(dispatchMock).toHaveBeenCalledWith({ type: 'LOGIN', payload: userMock });
		});
	});
  
	it('should logout session in store', async () => { 
		const { result } = hook;
		const dispatchMock = vi.mocked(useUserContext).mock.results[0].value.dispatch;

		act(() => {
			result.current.logoutStore();
		});

		await waitFor(() => {
			expect(dispatchMock).toHaveBeenCalledTimes(1);
			expect(dispatchMock).toHaveBeenCalledWith({ type: 'LOGOUT', payload: null });
			expect(tokenServiceMock.set).toHaveBeenCalledTimes(1);
			expect(tokenServiceMock.set).toHaveBeenCalledWith('');
			expect(toast.message).toHaveBeenCalledTimes(1);
			expect(toast.message).toHaveBeenCalledWith('Log out');
		});
	});
});
