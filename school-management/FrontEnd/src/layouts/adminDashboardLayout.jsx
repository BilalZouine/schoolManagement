import { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ADMIN_DASHBOARD_ROUTER, HOME_PAGE_ROUTER, PAGE_ERROR_ROUTER, STUDENT_DASHBOARD_ROUTER, LOGIN_ROUTER, STUDENTS_ROUTER, RedirectToRoute } from '../router';
import StudentApi from '../service/api/student/UserApi';
import { Button } from '@/components/ui/button';
import AdminDropDownMenu from './drop-down-menu/AdminDropDownMenu';
import {
    Home,
    GaugeIcon

} from 'lucide-react';
import { ModeToggle } from '../components/mode-toggle';
import AdminAdministrationSidebar from './Administration/adminAdministrationSidebar';
import { useStudentContext } from '../context/StudentContext';
function AdminDashboardLayout() {

    // const [Student, setStudent] = useState({})
    const { authenticated, setAuthenticated, logout: contextLogut, setStudent } = useStudentContext();

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

                    if (role !== "admin") {
                        RedirectToRoute(role)
                    }
                })
                .catch(({ response }) => {
                    contextLogut();

                })

        } else {
            navigate(LOGIN_ROUTER);

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
                            <Link to={ADMIN_DASHBOARD_ROUTER} className="flex items-center px-3  py-2 text-decoration-none ">
                                <GaugeIcon />
                                <span className="ml-2">dashboard</span>
                            </Link>
                        </li>
                        <li className=' px-2'>
                            <ModeToggle />

                        </li>
                        <li className=' px-2'>
                            <AdminDropDownMenu />
                        </li>


                    </ul>
                </div>
            </header>
            <hr />

            <main className="px-4 mx-auto flex space-y-4 py-4">
                <div className="flex w-full">
                    <div className="w-100 md:w-2/12 border rounded rounded-xl mr-2">
                        <AdminAdministrationSidebar />
                    </div>
                    <div className="w-100 md:w-10/12  border rounded rounded-xl mr-2 p-2">
                        <Outlet />
                    </div>
                </div>            </main>

            <footer></footer>
        </>
    );
}

export default AdminDashboardLayout;
