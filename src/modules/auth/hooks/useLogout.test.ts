import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { act, renderHook, RenderHookResult, waitFor } from '@testing-library/react';

import { useLogout } from './useLogout';
import { tokenService } from '@/modules/core/services/token.service';
import { useUserStore } from './useUserStore';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
	toast: {
		message: vi.fn(),
	},
}));

vi.mock('@/modules/auth/hooks/useUserStore', () => ({
	useUserStore: vi.fn(() => ({
		loginStore: vi.fn(),
		logoutStore: vi.fn(),
	})),
}));

vi.mock('@/modules/core/services/token.service', () => ({
	tokenService: {
		set: vi.fn(),
		get: vi.fn(),
	},
}));

const tokenServiceMock = tokenService as { set: Mock, get: Mock };

describe('useLogout', () => { 
	let hook: RenderHookResult<ReturnType<typeof useLogout>, unknown>;

	beforeEach(() => { 
		hook = renderHook(() => useLogout());
	});

	afterEach(() => { 
		hook.unmount();
		vi.clearAllMocks();
	});

	it('should be logout session', async () => { 
		const { result } = hook;
		const logoutStoreMock = vi.mocked(useUserStore).mock.results[0].value.logoutStore;

		act(() => {
			result.current.logout();
		});

		await waitFor(() => {
			expect(logoutStoreMock).toHaveBeenCalledTimes(1);
			expect(tokenServiceMock.set).toHaveBeenCalledTimes(1);
			expect(tokenServiceMock.set).toHaveBeenCalledWith('');
			expect(toast.message).toHaveBeenCalledTimes(1);
			expect(toast.message).toHaveBeenCalledWith('Log out');
		});
	});
});
