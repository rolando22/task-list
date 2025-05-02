import { toast } from 'sonner';

import { useUserContext } from '@/context';
import { tokenService } from '@/modules/core/services/token.service';

import type { UserState } from '@/types';

export function useUserStore() {
	const { dispatch } = useUserContext();

	const loginStore = async (userData: UserState) => {
		dispatch({ type: 'LOGIN', payload: userData });
	};

	const logoutStore = () => {
		dispatch({ type: 'LOGOUT', payload: null });
		tokenService.set('');
		toast.message('Log out');
	};

	return {
		loginStore,
		logoutStore,
	};
}

