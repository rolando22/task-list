import { useState } from 'react';
import { toast } from 'sonner';

import { useUserContext } from '@/context';
import { authService } from '@/modules/auth/services/auth.service';
import { tokenService } from '@/modules/core/services/token.service';

import type { Login } from '@/modules/auth/types';

export function useUser() {
	const { dispatch } = useUserContext();
	const [isLoading, setIsLoading] = useState(false);

	const login = async (loginData: Login) => {
		try {
			setIsLoading(true);
			const userData = await authService.login(loginData);
			dispatch({ type: 'LOGIN', payload: userData });
		} catch (error) {
			if (error instanceof Error) toast.error(error.message);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		dispatch({ type: 'LOGOUT', payload: null });
		tokenService.set('');
		toast.message('Log out');
	};

	return {
		isLoading, 
		login,
		logout,
	};
}
