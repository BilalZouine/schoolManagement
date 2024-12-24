import { Link, Outlet } from 'react-router-dom';
// import { HOME_PAGE_ROUTER, STUDENT_DASHBOARD_ROUTER, STUDENT_LOGIN_ROUTER, STUDENT_LOGOUT_ROUTER, STUDENT_REGISTER_ROUTER, STUDENTS_ROUTER } from '../router';

function Layout() {

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
                                to={'/'}
                                className="px-3 ml-5 py-2 text-decoration-none text-white"
                            >
                                Home Page
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

export default Layout;
