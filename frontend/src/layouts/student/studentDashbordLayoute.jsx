import { Link, Outlet, useNavigate } from 'react-router-dom';
import { STUDENT_DASHBOARD_ROUTER, STUDENT_LOGIN_ROUTER, STUDENTS_ROUTER } from '../../route';
// import { HOME_PAGE_ROUTER, STUDENT_DASHBOARD_ROUTER, STUDENT_LOGIN_ROUTER, STUDENT_LOGOUT_ROUTER, STUDENT_REGISTER_ROUTER, STUDENTS_ROUTER } from '../router';
import { Button } from '@/components/ui/button'
import { useStudentContext } from '../../contexts/studentContext';
import { useEffect } from 'react';
import { StudentApi } from '../../service/api/student/studentApi';
function StudentDashboardLayout() {
    const { setStudent, setAuthenticated, logout:contextLogout } = useStudentContext()
    const navigate = useNavigate()

    useEffect(() => {
        // if(!authenticated){
        //     navigate(STUDENT_LOGIN_ROUTER)
        //     return;
        // }
        StudentApi.getStudent()
            .then((data) => {
                setStudent(data.data)
                setAuthenticated(true)
            })
            .catch((reasen) => {
                contextLogout(false)
                navigate(STUDENT_LOGIN_ROUTER); // Redirect to the login page
            })
    }, []);

    const logout = () => {
        contextLogout()
        navigate(STUDENT_LOGIN_ROUTER);
    }

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto flex justify-between items-center bg-gray-800 bg-opacity-90 px-12 py-3 mb-4 shadow-2xl">
                    {/* Logo */}
                    <div className="text-2xl text-white font-semibold inline-flex items-center">
                        <img className='h-12 mx-2' src="logo.png" alt="" />
                    </div>
                    {/* Desktop Menu Links */}
                    <ul className="flex text-white items-center  ">
                        <li>
                            <Link
                                to={STUDENT_DASHBOARD_ROUTER}
                                className="px-3 ml-5 py-2 text-decoration-none text-white"
                            >
                                dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={STUDENTS_ROUTER}
                                className="px-3 ml-5 py-2 text-decoration-none text-white"
                            >
                                Student
                            </Link>
                        </li>
                        <li>
                            <Button className='bg-white-800 ' onClick={logout}>Logout</Button>
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

export default StudentDashboardLayout;
