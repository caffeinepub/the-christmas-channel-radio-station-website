import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import ProfileSetup from './components/ProfileSetup';
import InitializeDJProfiles from './components/InitializeDJProfiles';

// Lazy load pages
import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const SchedulePage = lazy(() => import('./pages/SchedulePage'));
const DJsPage = lazy(() => import('./pages/DJsPage'));
const RequestsPage = lazy(() => import('./pages/RequestsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageDJs = lazy(() => import('./pages/admin/ManageDJs'));
const ManagePrograms = lazy(() => import('./pages/admin/ManagePrograms'));
const ManageNowPlaying = lazy(() => import('./pages/admin/ManageNowPlaying'));
const ManageThemeSettings = lazy(() => import('./pages/admin/ManageThemeSettings'));
const ManageSongRequests = lazy(() => import('./pages/admin/ManageSongRequests'));
const ManageOnAir = lazy(() => import('./pages/admin/ManageOnAir'));
const ManageStationInfo = lazy(() => import('./pages/admin/ManageStationInfo'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Root route with Layout
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Layout />
      <ProfileSetup />
      <InitializeDJProfiles />
    </>
  ),
});

// Define routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const scheduleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/schedule',
  component: SchedulePage,
});

const djsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/djs',
  component: DJsPage,
});

const requestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/requests',
  component: RequestsPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboard,
});

const manageDJsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-djs',
  component: ManageDJs,
});

const manageProgramsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-programs',
  component: ManagePrograms,
});

const manageNowPlayingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-now-playing',
  component: ManageNowPlaying,
});

const manageThemeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-theme',
  component: ManageThemeSettings,
});

const manageSongRequestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-song-requests',
  component: ManageSongRequests,
});

const manageOnAirRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-on-air',
  component: ManageOnAir,
});

const manageStationInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-station-info',
  component: ManageStationInfo,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  scheduleRoute,
  djsRoute,
  requestsRoute,
  aboutRoute,
  adminRoute,
  manageDJsRoute,
  manageProgramsRoute,
  manageNowPlayingRoute,
  manageThemeRoute,
  manageSongRequestsRoute,
  manageOnAirRoute,
  manageStationInfoRoute,
]);

// Create router
const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
