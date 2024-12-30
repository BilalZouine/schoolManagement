import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HOME_ROUTER, STUDENT_DASHBOARD_ROUTER, STUDENT_LOGIN_ROUTER, STUDENT_LOGOUT_ROUTER, STUDENT_REGISTER_ROUTER, STUDENTS_ROUTER } from '../route';
import { useStudentContext } from '../contexts/studentContext';
import { useEffect } from 'react';
import { Home, LogIn, UserPlus } from 'lucide-react';
import { StudentDropdownMenu } from './StudentDropdownMenu';
import { ModeToggle } from '../components/mode-toggle';

function GuestLayout() {
    const navigate = useNavigate()
    const { authenticated  } = useStudentContext()

    useEffect(() => {
        if (authenticated) {

            navigate(STUDENT_DASHBOARD_ROUTER); // Redirect to the login page
        }
    }, []);
    return (
        <>
            <header className="border-b-2 shadow-sm">
                <div className="mx-auto flex justify-between items-center px-12 py-2 mb-4 shadow-1xl">
                    {/* Logo */}
                    <div className="text-2xl text-white font-semibold inline-flex items-center">
                        <img className='h-12 mx-2' src="logo.png" alt="" />
                    </div>
                    {/* Desktop Menu Links */}
                    <ul className="flex justify-evenly items-center w-1/3  ">
                        <li>
                            <Link
                                to={HOME_ROUTER}
                                className="text-decoration-none"
                            >
                                <Home />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={STUDENT_LOGIN_ROUTER}
                                className="text-decoration-none"
                            >
                                <LogIn />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={STUDENT_REGISTER_ROUTER}
                                className="text-decoration-none"
                            >

                                <UserPlus />
                            </Link>
                        </li>
                        <li>
                           <ModeToggle/>
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
