import React, { createContext, useContext, useState } from 'react';
import { StudentApi } from '../service/api/student/studentApi';

// إنشاء السياق
export const StudentStateContext = createContext({
    login: (email, password) => { },
    getStudent: () => { },
    logout: () => { },
    authenticated:false,
    setStudent: () => { },
    setAuthenticated: () => { },
});

export default function StudentContext({ children }) {
    const [authenticated, _setAuthenticated] = useState(window.localStorage.getItem('AUTHENTICATED') === 'true')
    const [student, setStudent] = useState({});
    const login = async (email, password) => {
        await StudentApi.getCsrfToken();
        return await StudentApi.login(email, password);
    };

    const logout = async () => {
        setStudent({});
        setAuthenticated(false)
        return await StudentApi.logout();
    };
    

    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated);
        window.localStorage.setItem('AUTHENTICATED', isAuthenticated);
    }


    return (
        <StudentStateContext.Provider
            value={{
                login,
                logout,
                student,
                setStudent,
                authenticated,
                setAuthenticated
            }}
        >
            {children}
        </StudentStateContext.Provider>
    );
}

// استخدام السياق
export const useStudentContext = () => useContext(StudentStateContext);
