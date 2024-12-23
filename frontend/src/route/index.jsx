
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layouts/layout'
import Login from '../pages/login'
import Home from '../pages/home'
import Students from '../pages/students'
import Register from '../pages/register'
import NotFound from '../pages/noteFound'


export const HOME_ROUTER = '/'
export const STUDENTS_ROUTER = '/studentS'
export const STUDENT_LOGIN_ROUTER = '/login'
export const STUDENT_REGISTER_ROUTER = '/register'
export const NOT_FOUNDE_ROUTER = '*'
export const router = createBrowserRouter([
    {


        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            }
            ,
            {
                path: STUDENTS_ROUTER,
                element: <Students />
            }
            ,
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
            {
                path: NOT_FOUNDE_ROUTER,
                element: <NotFound />
            }

        ]
    }
])