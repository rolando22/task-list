import { useEffect } from 'react';
import { Toaster } from 'sonner';

import { AppRouter } from '@/routes/AppRouter';

import { useUserContext } from '@/context';
import { tokenService } from '@/modules/core/services/token.service';

export function App() {
	const { user } = useUserContext();

	useEffect(() => {
		if (user.token === '') return;
		tokenService.set(user.token);
	}, [user.token]);

	return (
		<div className='mx-auto max-w-5xl grid'>
			<AppRouter />
			<Toaster richColors />
		</div>
	);
}
