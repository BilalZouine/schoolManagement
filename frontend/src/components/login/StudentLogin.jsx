import React from 'react';
import { useForm } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    Form

} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from "react-router-dom";
import { Admin_DASHBOARD_ROUTER, HOME_ROUTER, STUDENT_DASHBOARD_ROUTER, Teacher_DASHBOARD_ROUTER } from '../../router';
import { Loader } from "lucide-react";
import { useStudentContext } from '../../context/StudentContext';

const formSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(50)
})

function StudentLogin() {

    const { login, setAuthenticated, authenticated,setStudent } = useStudentContext()
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues:{email:"bilalzouine9@gmail.com",password:"123456789"}
    });
    const { setError, formState: { isSubmitting }, control, handleSubmit } = form


    const submitForm = async (data) => {

        try {
            const response = await login(data.email, data.password)
            if (response.status === 200) {
                setAuthenticated(true)
                const { data } = response.data
                const { role } = data;                          

                switch (role) {
                    
                    case 'student':                       
                        setStudent(data)
                        navigate(STUDENT_DASHBOARD_ROUTER)
                        break;
                    case 'teacher':
                        setStudent(data)
                        navigate(Teacher_DASHBOARD_ROUTER)
                        break;
                    case 'admin':
                        
                        setStudent(data)
                        navigate(Admin_DASHBOARD_ROUTER)
                        break;
                    default:
                        break;

                }
            }

        } catch ({ response }) {            
            if (response?.status == 422) {
                setError('email', {
                    message: response.data.errors.email.join()
                })
            }
        }

    }
    if (authenticated) {
        return <></>;
    }

    return (

        <Form {...form}>
            <form onSubmit={handleSubmit(submitForm)} className='space-y-3 w-3/4 mx-auto bg-blue-400 p-3 rounded '>

                <FormField
                    name="email"
                    id="email"
                    control={control}
                    render={({ field }) => (
                        <>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Entre your email account"
                                    {...field}

                                />
                            </FormControl>
                            <FormMessage />
                        </>
                    )}
                />
                <FormField
                    name="password"
                    id="password"
                    control={control}
                    render={({ field }) => (
                        <>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Entre your Password account"
                                    {...field}

                                />
                            </FormControl>
                            <FormMessage />
                        </>
                    )}
                />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className='p-2 h-7 mx-auto bg-green-600 hover:bg-green-800 '
                >
                    {isSubmitting && <Loader className='animate-spin' />}
                    Submit
                </Button>
            </form>

        </Form>


    );
}

export default StudentLogin;
