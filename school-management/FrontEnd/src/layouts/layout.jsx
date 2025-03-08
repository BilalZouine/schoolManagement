import { Link, Outlet } from 'react-router-dom';
import { ADMIN_DASHBOARD_ROUTER, HOME_PAGE_ROUTER, PARENT_DASHBOARD_ROUTER, STUDENT_DASHBOARD_ROUTER, LOGIN_ROUTER, STUDENT_LOGOUT_ROUTER, STUDENT_REGISTER_ROUTER, STUDENTS_ROUTER, TEACHER_DASHBOARD_ROUTER, RedirectToRoute } from '../router';
import { useStudentContext } from '../context/StudentContext';
import { GaugeIcon, Home, LogIn, LogOut } from 'lucide-react';
import StudentDropDownMenu from './drop-down-menu/StudentDropDownMenu';

function Layout() {
    const studentContext = useStudentContext();
    const { student: { role } } = useStudentContext()

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto flex justify-between items-center bg-gray-800 bg-opacity-90 px-12 py-3 mb-4 shadow-2xl">
                    {/* Logo */}
                    <div className="text-2xl text-white font-semibold inline-flex items-center">
                        <img className='h-12 mx-2' src="logo.png" alt="" />
                    </div>
                    {/* Desktop Menu Links */}
                    <ul className="flex items-center justify-evenly w-1/3 ">
                        <li>
                            <Link
                                to={HOME_PAGE_ROUTER}
                                className="px-3  py-2 text-decoration-none "
                            >
                                <Home />
                            </Link>
                        </li>
                        {
                            studentContext.authenticated
                                ? <>
                                    <li>
                                        <Link
                                            to={RedirectToRoute(role)}
                                            className="px-3  py-2 text-decoration-none "
                                        >
                                            <GaugeIcon />
                                        </Link>
                                    </li>

                                    <li className=' px-2'>
                                        <StudentDropDownMenu />
                                    </li>

                                </> : <>
                                    <li>
                                        <Link
                                            to={LOGIN_ROUTER}
                                            className="px-3  py-2 text-decoration-none text-white"
                                        >
                                            <LogIn />
                                        </Link>
                                    </li>
                                </>
                        }

                    </ul>
                </div>
            </header>

            <main className="container mx-auto ">
                <Outlet />

            </main>

            <footer></footer>
        </>
    );
}

export default Layout;
