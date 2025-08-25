import { lazy } from 'react';

// PROJECT IMPORT
import Loadable from '@/components/Loadable';
import MainLayout from '@/layout';
import ErrorBoundary from './ErrorBoundary';
import AuthGuard from '@/utils/route-guard/AuthGuard';

// PAGES
const Dashboard = Loadable(lazy(() => import('@/pages/Dashboard')));
const Hierarchy = Loadable(lazy(() => import('@/pages/Hierarchy')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	errorElement: <ErrorBoundary />,
	children: [
		{
			path: '/',
			element: (
				<AuthGuard>
					<MainLayout />
				</AuthGuard>
			),
			children: [
				{
					path: 'dashboard',
					element: <Dashboard />,
				},
				{
					path: 'hierarchy',
					element: <Hierarchy />,
				},
			],
		},
	],
};

export default MainRoutes;
