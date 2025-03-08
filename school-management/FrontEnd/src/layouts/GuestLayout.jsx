import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HOME_PAGE_ROUTER, STUDENT_DASHBOARD_ROUTER, LOGIN_ROUTER } from '../router';
import { useStudentContext } from '../context/StudentContext';
import { Home, LogIn } from 'lucide-react';

function GuestLayout() {
    const navigate = useNavigate();
    const studentContext = useStudentContext();

    useEffect(() => {
        if (studentContext.authenticated) {
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
                                to={HOME_PAGE_ROUTER}
                                className="px-3 ml-5 py-2 text-decoration-none text-white"
                            >
                                <Home />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={LOGIN_ROUTER}
                                className="px-3 ml-5 py-2 text-decoration-none text-white"
                            >
                                <LogIn />
                            </Link>
                        </li>

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

export default GuestLayout;
