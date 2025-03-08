import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HOME_PAGE_ROUTER, PAGE_ERROR_ROUTER, LOGIN_ROUTER, TEACHER_DASHBOARD_ROUTER, RedirectToRoute } from '../router';
import { useStudentContext } from '../context/StudentContext';
import StudentApi from '../service/api/student/UserApi';
import TeacherDropDownMenu from './drop-down-menu/TeacherDropDownMenu';
import {
    Home,
    GaugeIcon

} from 'lucide-react';
import { ModeToggle } from '../components/mode-toggle';
import TeacherAdministrationSidebar from './Administration/teacherAdministrationSidebar';
function TeacherDashboardLayout() {

    // const [Student, setStudent] = useState({})
    const { authenticated, setStudent, setAuthenticated, logout: contextLogut } = useStudentContext();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {

        if (authenticated) {

            StudentApi.getStudent()
                .then(({ data }) => {
                    const { role } = data;
                    setStudent(data)
                    setAuthenticated(true)
                    setIsLoading(false)
                    if (role !== "teacher") {
                        RedirectToRoute(role)
                    }

                })
                .catch(({ response }) => {
                    contextLogut();

                })
        } else {
            navigate(LOGIN_ROUTER); // Redirect to the login page

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
                        <li className=' px-2'>
                            <Link to={HOME_PAGE_ROUTER} className="px-3  py-2 text-decoration-none ">
                                <Home />
                            </Link>
                        </li>
                        <li className=' px-2'>
                            <Link to={TEACHER_DASHBOARD_ROUTER} className="flex items-center px-3  py-2 text-decoration-none ">
                                <GaugeIcon />
                                <span className="ml-2">dashboard</span>
                            </Link>
                        </li>
                        <li className=' px-2'>
                            <ModeToggle />

                        </li>
                        <li className=' px-2'>
                            <TeacherDropDownMenu />
                        </li>


                    </ul>
                </div>
            </header>
            <hr />

            <main className="px-4 mx-auto flex space-y-4 py-4">
                <div className="flex w-full ">
                    <div className="w-full md:w-1/4">
                        <TeacherAdministrationSidebar />
                    </div>
                    <div className="w-full md:w-3/4">
                        <Outlet />
                    </div>
                </div>            </main>

            <footer></footer>
        </>
    );
}

export default TeacherDashboardLayout;
