import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HOME_ROUTER, STUDENT_DASHBOARD_ROUTER, STUDENT_LOGIN_ROUTER, STUDENTS_ROUTER, NOT_FOUNDE_ROUTER } from '../router';

import {
    Home,
    GaugeIcon

} from 'lucide-react';
import { ModeToggle } from '../components/mode-toggle';
import AdminAdministrationSidebar from './Administration/adminAdministrationSidebar';
import { useStudentContext } from '../context/StudentContext';
import { StudentDropdownMenu } from './StudentDropdownMenu';
import { StudentApi } from '../service/api/student/studentApi';



function AdminDashboardLayout() {

    // const [Student, setStudent] = useState({})
    const { authenticated, setStudent, setAuthenticated, logout: contextLogut } = useStudentContext();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {

        if (authenticated) {
            setIsLoading(false)
            StudentApi.getStudent()
                .then(({ data }) => {

                    const { role } = data;

                    switch (role) {
                        case 'admin':
                            setStudent(data)
                            setAuthenticated(true)
                            break;
                        default:
                            navigate(NOT_FOUNDE_ROUTER);
                            break;

                    }
                })
                .catch(({ response }) => {
                    // contextLogut();
                    console.log(response);

                })
        } else {
            navigate(STUDENT_LOGIN_ROUTER); // Redirect to the login page

        }

    }, []);

    if (isLoading) {
        return <></>;
    }

    return (
        <>
            <header>
                <div className="mx-auto flex justify-between place-items-center items-center px-12 py-1 mb-2 ">
                    {/* Logo */}
                    <div className="inline-flex items-center">
                        <img className='h-12 mx-2' src="../logo.png" alt="" />
                    </div>
                    {/* Desktop Menu Links */}
                    <ul className="flex w-1/2 justify-between items-center ">
                        <li className='ml-5 px-2'>
                            <Link to={HOME_ROUTER} className="px-3 ml-5 py-2 text-decoration-none ">
                                <Home />
                            </Link>
                        </li>
                        <li className='ml-5 px-2'>
                            <Link to={STUDENT_DASHBOARD_ROUTER} className="flex items-center px-3 ml-5 py-2 text-decoration-none ">
                                <GaugeIcon />
                                <span className="ml-2">dashboard</span>
                            </Link>
                        </li>
                        <li className='ml-5 px-2'>
                            <ModeToggle />

                        </li>
                        <li className='ml-5 px-2'>
                            <StudentDropdownMenu />
                        </li>


                    </ul>
                </div>
            </header>
            <hr />

            <main className="px-4 mx-auto flex space-y-4 py-4">
                <div className="flex w-full">
                    <div className="w-100 md:w-1/4">
                        <AdminAdministrationSidebar />
                    </div>
                    <div className="w-100 md:w-3/4">
                        <Outlet />
                    </div>
                </div>         
                   </main>

            <footer></footer>
        </>
    );
}

export default AdminDashboardLayout;
