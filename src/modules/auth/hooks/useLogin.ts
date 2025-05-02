import { useState } from 'react';
import { toast } from 'sonner';

import { useUserStore } from '@/modules/auth/hooks/useUserStore';
import { authService } from '@/modules/auth/services/auth.service';

import type { Login } from '@/modules/auth/types';

export function useLogin() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
  
	const { loginStore } = useUserStore();

	const login = async (loginData: Login) => {
		try {
			setIsLoading(true);
			const userData = await authService.login(loginData);
			loginStore(userData);
		} catch (error) {
			if (error instanceof Error) toast.error(error.message);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading, 
		login,
	};
}
