import { toast } from 'sonner';

import { useUserStore } from '@/modules/auth/hooks/useUserStore';
import { tokenService } from '@/modules/core/services/token.service';

export function useLogout() {
	const { logoutStore } = useUserStore();

	const logout = () => {
		logoutStore();
		tokenService.set('');
		toast.message('Log out');
	};

	return {
		logout,
	};
}
