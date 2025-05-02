import { Navigate, Outlet } from 'react-router-dom';

import { useUserContext } from '@/context';
import { paths } from '@/routes/paths';

export function AuthGuard() {
	const { user } = useUserContext();

	return user.token !== '' ? (<Outlet />) : (<Navigate to={paths.login} replace />);
}
