import React, { createContext, useContext } from 'react';
import { StudentApi } from '../service/api/student/studentApi';

// إنشاء السياق
export const StudentStateContext = createContext({
    login: (email, password) => { },
    getTest: () => { },
});

export default function StudentContext({ children }) {
    const login = async (email, password) => {
        await StudentApi.getCsrfToken();
        
        return await StudentApi.login(email, password);
    };
    const getTest = async () => {
        return await StudentApi.getTest();
    };

    return (
        <StudentStateContext.Provider
            value={{
                login,
                getTest,
            }}
        >
            {children}
        </StudentStateContext.Provider>
    );
}

// استخدام السياق
export const useStudentContext = () => useContext(StudentStateContext);
