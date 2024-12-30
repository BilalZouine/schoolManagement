
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layouts/layout'
import Login from '../pages/login'
import Home from '../pages/home'
import Students from '../pages/students'
import Register from '../pages/register'
import NotFound from '../pages/noteFound'
import GuestLayout from '../layouts/guestLayout'
import StudentDashboard from '../components/student/StudentDashboard'
import StudentLayout from '../layouts/guestLayout'
import StudentDashboardLayout from '../layouts/studentDashbordLayoute'


export const HOME_ROUTER = '/'
export const STUDENTS_ROUTER = '/students'
export const STUDENT_LOGIN_ROUTER = '/login'
export const STUDENT_REGISTER_ROUTER = '/register'
export const STUDENT_LOGOUT_ROUTER = '/logout'
export const STUDENT_DASHBOARD_ROUTER = '/dashboard'
export const NOT_FOUNDE_ROUTER = '*'
export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: NOT_FOUNDE_ROUTER,
                element: <NotFound />
            }

        ]
    },
    {
        element: <GuestLayout />,
        children: [
            {
                path: STUDENT_LOGIN_ROUTER,
                element: <Login />
            }
            ,
            {
                path: STUDENT_REGISTER_ROUTER,
                element: <Register />
            }
            ,
        ]

    }
    ,
    {
        element: <StudentDashboardLayout />,
        children: [
            {
                path: STUDENTS_ROUTER,
                element: <Students />
            }
            ,
            {
                path: STUDENT_DASHBOARD_ROUTER,
                element: <StudentDashboard />
            }
        ]

    }
])