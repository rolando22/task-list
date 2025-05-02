import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppGuard, AuthGuard } from '@/guards';
import { LoadScreen } from '@/modules/core/components';
import { paths } from '@/routes/paths';

const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));

export function AppRouter() {
	return (
		<Suspense fallback={<LoadScreen />}>
			<BrowserRouter>
				<Routes>
					<Route element={<AppGuard />}>
						<Route path={paths.login} element={<LoginPage />} />
					</Route>
					<Route element={<AuthGuard />}>
						<Route path={paths.home} element={<HomePage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
}
