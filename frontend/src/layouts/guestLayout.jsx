import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Admin_DASHBOARD_ROUTER, HOME_ROUTER, STUDENT_DASHBOARD_ROUTER, STUDENT_LOGIN_ROUTER, STUDENT_REGISTER_ROUTER, Teacher_DASHBOARD_ROUTER } from '../router';
import { useStudentContext } from '../context/studentContext';
import { useEffect } from 'react';
import { Home, LogIn, UserPlus } from 'lucide-react';
import { ModeToggle } from '../components/mode-toggle';

function GuestLayout() {
    const navigate = useNavigate()
    const { authenticated, student } = useStudentContext()

    useEffect(() => {
        if (authenticated) {
            navigate(STUDENT_DASHBOARD_ROUTER); // Redirect to the login page
            const { role } = student;
            console.log(role);
            
            switch (role) {
                case 'student':
                    navigate(STUDENT_DASHBOARD_ROUTER)
                    break;
                case 'teacher':

                    navigate(Teacher_DASHBOARD_ROUTER)
                    break;
                case 'admin':

                    navigate(Admin_DASHBOARD_ROUTER)
                    break;
                default:
                    break;

            }
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
                            <ModeToggle />
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
