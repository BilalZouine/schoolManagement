import React, { useEffect, useState } from 'react';
import { useStudentContext } from '../../contexts/studentContext';
import { useNavigate } from 'react-router-dom';
import { STUDENT_LOGIN_ROUTER } from '../../route';


function StudentDashboard() {

    const { student } = useStudentContext()

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        #ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Full Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Date create account
                    </th>

                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {student.id}
                    </th>
                    <th className="px-6 py-4 ">
                        {student.name}
                    </th>
                    <td className="px-6 py-4">
                        {student.email}
                    </td>
                    <td className="px-6 py-4">
                        {student.created_at}
                    </td>

                </tr>

            </tbody>
        </table>
    );
}

export default StudentDashboard;