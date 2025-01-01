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
import { useStudentContext } from '../../contexts/studentContext';
import { useNavigate } from "react-router-dom";
import { HOME_ROUTER, STUDENT_DASHBOARD_ROUTER } from '../../route';
import { Loader } from "lucide-react";

const formSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(50)
})

function StudentLogin() {

    const { login,setAuthenticated,authenticated } = useStudentContext()
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            email: 'bilalzouine9@gmail.com',
            password: '123456789'
        }
    });
    const { setError, formState: { isSubmitting }, control, handleSubmit } = form


    const submitForm = async (data) => {

        try {
            const response = await login(data.email, data.password)
            if (response.status == 204 ) {
                setAuthenticated(true)
                navigate(STUDENT_DASHBOARD_ROUTER)
            }

        } catch ({ response }) {
            if (response.status == 422) {
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
