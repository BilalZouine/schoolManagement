import { Link, Outlet, useNavigate } from 'react-router-dom';
import { STUDENT_DASHBOARD_ROUTER, STUDENT_LOGIN_ROUTER, STUDENT_LOGOUT_ROUTER, STUDENT_REGISTER_ROUTER, STUDENTS_ROUTER } from '../route';
import { useStudentContext } from '../contexts/studentContext';
import { useEffect } from 'react';

function GuestLayout() {
    const navigate = useNavigate()
    const {authenticated} = useStudentContext()

    useEffect(() => {
        if (authenticated) {
            
            navigate(STUDENT_DASHBOARD_ROUTER); // Redirect to the login page
        }
    }, []);
    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto flex justify-between items-center bg-gray-800 bg-opacity-90 px-12 py-3 mb-4 shadow-2xl">
                    {/* Logo */}
                    <div className="text-2xl text-white font-semibold inline-flex items-center">
                        <img className='h-12 mx-2' src="logo.png" alt="" />
                    </div>
                    {/* Desktop Menu Links */}
                    <ul className="flex text-white ">
                       <li>
                            <Link
                                to={STUDENT_LOGIN_ROUTER}
                                className="px-3 ml-5 py-2 text-decoration-none text-white"
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={STUDENT_REGISTER_ROUTER}
                                className="px-3 ml-5 py-2 text-decoration-none text-white"
                            >
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Outlet />

            </main>

            <footer></footer>
        </>
    );
}

export default GuestLayout;
