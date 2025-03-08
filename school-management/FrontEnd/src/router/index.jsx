import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PageNoteFound from "../pages/PageNoteFound";
import Layout from "../layouts/layout";
import GuestLayout from "../layouts/GuestLayout";
import StudentDashboardLayout from "../layouts/studentDashboardLayout";
import StudentDashboard from "../components/Student/StudentDashboard";
import AdminDashboardLayout from "../layouts/adminDashboardLayout";
import AdminDashboard from "../components/admin/adminDashboard";
import TeacherDashboardLayout from "../layouts/teacterDashboardLayout";
import TeacherDashboard from "../components/teacher/teacherDashboard";
import ParentsManage from "../components/admin/parentsManage";
import ParentDashboardLayout from "../layouts/ParentDashboardLayout";
import ParentDashboard from "../components/parent/parentDashboard";



export const HOME_PAGE_ROUTER = '/';
export const STUDENTS_ROUTER = '/users';
export const STUDENT_DASHBOARD_ROUTER = '/student/dashboard';
export const LOGIN_ROUTER = '/login';
export const STUDENT_LOGOUT_ROUTER = '/logout';
export const STUDENT_REGISTER_ROUTER = '/register';
export const PAGE_ERROR_ROUTER = '/page/404';
export const PAGE_NOT_FOUND_ROUTER = '*';


export const ADMIN_BASE_ROUTER = '/admin';
export const ADMIN_DASHBOARD_ROUTER = `${ADMIN_BASE_ROUTER}/dashboard`;
export const ADMIN_MANAGE_PARENTS_ROUTER = `${ADMIN_BASE_ROUTER}/manage-parents`;


export const TEACHER_DASHBOARD_ROUTER = '/teacher/dashboard';
export const PARENT_DASHBOARD_ROUTER = '/parent/dashboard';

export const RedirectToRoute = (RoleType) => {
    switch (RoleType) {
        case 'student':
            return (STUDENT_DASHBOARD_ROUTER);
        case 'teacher':
            return (TEACHER_DASHBOARD_ROUTER);
        case 'admin':
            return (ADMIN_DASHBOARD_ROUTER);
        case 'parent':
            return (PARENT_DASHBOARD_ROUTER);
        default: break;
    }

}

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: HOME_PAGE_ROUTER,
                element: <Home />

            },
            {
                path: STUDENTS_ROUTER,
                element: <Users />

            },
            {
                path: PAGE_NOT_FOUND_ROUTER,
                element: <PageNoteFound />

            }
        ]
    }, {
        element: <GuestLayout />,
        children: [
            {
                path: STUDENT_REGISTER_ROUTER,
                element: <Register />

            },

            {
                path: LOGIN_ROUTER,
                element: <Login />

            }
        ]
    }, {
        element: <StudentDashboardLayout />,
        children: [

            {
                path: STUDENT_DASHBOARD_ROUTER,
                element: <StudentDashboard />

            }
        ]
    },
    {
        element: <AdminDashboardLayout />,
        children: [

            {
                path: ADMIN_DASHBOARD_ROUTER,
                element: <AdminDashboard />

            },
            {
                path: ADMIN_MANAGE_PARENTS_ROUTER,
                element: <ParentsManage />

            }
        ]
    },
    {
        element: <TeacherDashboardLayout />,
        children: [

            {
                path: TEACHER_DASHBOARD_ROUTER,
                element: <TeacherDashboard />

            }
        ]
    },
    {
        element: <ParentDashboardLayout />,
        children: [

            {
                path: PARENT_DASHBOARD_ROUTER,
                element: <ParentDashboard />

            }
        ]
    }
]);