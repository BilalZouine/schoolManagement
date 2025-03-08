import { createContext, useContext, useEffect, useState } from 'react';
import studentApi from '../service/api/student/UserApi';
import StudentApi from '../service/api/student/UserApi';
export const StudentStateContext = createContext({
    student: {},
    login: (email, password) => { },
    setStudent: () => { },
    logout: () => { },
    setToken: (token) => { },
    authenticated: false,
    setAuthenticated: () => { },

});


export default function StudentContext({ children }) {

    const [student, setStudent] = useState({});
    const [authenticated, _setAuthenticated] = useState(window.localStorage.getItem('AUTHENTICATED') === 'true');

    const login = async (email, password) => {
        // await studentApi.getCsrfToken();
        return await studentApi.login(email, password)


    };
    useEffect(() => {
        if (authenticated) {

            StudentApi.getStudent()
                .then(({ data }) => {
                    setStudent(data)
                })
                .catch(({ response }) => {
                    // contextLogut();
                    console.log(response);

                })

        }
    },[authenticated])

    const logout = () => {
        setStudent({})
        setAuthenticated(false)
    };

    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated)
        window.localStorage.setItem('AUTHENTICATED', isAuthenticated)


    }

    const setToken = (token) => {

        window.localStorage.setItem('token', token)

    }
    return (

        <StudentStateContext.Provider value={{
            student,
            setStudent,
            login,
            logout,
            authenticated,
            setAuthenticated,
            setToken
        }}>
            {children}
        </StudentStateContext.Provider>
    );
};

export const useStudentContext = () => useContext(StudentStateContext);