import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import { useSelector } from 'react-redux';
import TaskPage from './pages/TaskPage';
import CreateTask from './sections/@dashboard/task/CreateTask';
import UpdateTask from './sections/@dashboard/task/UpdateTask';
import ProjectPage from './pages/ProjectPage';
import CreateProject from './sections/@dashboard/project/CreateProject';
import UpdateProject from './sections/@dashboard/project/UpdateProject';

// ----------------------------------------------------------------------

export default function Router() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    // console.log(isLoggedIn);
    

    const routes = useRoutes([
      {
        path: '/dashboard',
        // element: <DashboardLayout />,
        element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" replace />,
        children: [
          { element: <Navigate to="/dashboard/app" />, index: true },
          { path: 'app', element: <DashboardAppPage /> },
          { path: 'user', element: <UserPage /> },
          { path:"project", element:<ProjectPage/>},
          { path:"project/create" , element:<CreateProject/>},
          {path:"project/update/:id" , element:<UpdateProject/>},
          { path:"task", element:<TaskPage/>},
          { path:"task/create" , element:<CreateTask/>},
          {path:"task/update/:id" , element:<UpdateTask/>},
          { path: 'blog', element: <BlogPage /> },
        ],
      },
      {
        path: 'login',
        // element: <LoginPage />,
        element: !isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard/app" replace />,
      },
      {
        element: <SimpleLayout />,
        children: [
          { element: <Navigate to="/dashboard/app" />, index: true },
          { path: '404', element: <Page404 /> },
          { path: '*', element: <Navigate to="/404" /> },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ]);

  return routes;
}