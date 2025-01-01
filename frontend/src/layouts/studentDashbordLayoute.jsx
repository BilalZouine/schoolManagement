import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HOME_ROUTER, STUDENT_DASHBOARD_ROUTER, STUDENT_LOGIN_ROUTER, STUDENTS_ROUTER } from '../route';
// import { HOME_PAGE_ROUTER, STUDENT_DASHBOARD_ROUTER, STUDENT_LOGIN_ROUTER, STUDENT_LOGOUT_ROUTER, STUDENT_REGISTER_ROUTER, STUDENTS_ROUTER } from '../router';
import { Button } from '@/components/ui/button'
import { useStudentContext } from '../contexts/studentContext';
import { useEffect } from 'react';
import { StudentApi } from '../service/api/student/studentApi';
import { Gauge, Home, LogOut, UserCircle2 } from 'lucide-react';
import { StudentDropdownMenu } from './StudentDropdownMenu';
import { ModeToggle } from '../components/mode-toggle';
import StudentAdministrationSidebar from './Administration/StudentAdministrationSidebar';
function StudentDashboardLayout() {
    const { setStudent, setAuthenticated, logout: contextLogout, authenticated, student } = useStudentContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (authenticated) {

            if (Object.keys(student).length === 0) {
                StudentApi.getStudent()
                    .then((data) => {
                        setStudent(data.data)
                        console.log(data.data);
                        
                        setAuthenticated(true)
                    })
                    .catch((reasen) => {
                        contextLogout(false)
                    })
            }

        } else {
            navigate(STUDENT_LOGIN_ROUTER)
        }

    }, [authenticated]);
    if (!authenticated) {
        return <></>;
    }


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
                                to={STUDENT_DASHBOARD_ROUTER}
                                className="text-decoration-none"
                            >
                                <Gauge />

                            </Link>
                        </li>
                        <li>
                            <Link
                                to={STUDENTS_ROUTER}
                                className="text-decoration-none"
                            >
                                <UserCircle2 />
                            </Link>
                        </li>

                        <li>
                            <StudentDropdownMenu />
                        </li>
                        <li>
                            <ModeToggle />
                        </li>
                    </ul>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-3">
                <div className="flex">
                    <div className="w-1/4">
                        <StudentAdministrationSidebar />
                    </div>
                    <div className="w-3/4">
                        <Outlet />
                    </div>

                </div>

            </main>

            <footer></footer>
        </>
    );
}

export default StudentDashboardLayout;
