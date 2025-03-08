import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoaderPinwheel } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { useStudentContext } from '../../context/StudentContext';
import { ADMIN_DASHBOARD_ROUTER, PARENT_DASHBOARD_ROUTER, RedirectToRoute, STUDENT_DASHBOARD_ROUTER, TEACHER_DASHBOARD_ROUTER } from '../../router';
import StudentApi from '../../service/api/student/UserApi';



const formSchema = yup.object({
    email: yup.string().email().min(2).max(30).required(),
    password: yup.string().min(2).max(30).required()
});
function UserLogin() {

    const navigate = useNavigate()
    const { login, setAuthenticated, setToken } = useStudentContext()
    const form = useForm({
        resolver: yupResolver(formSchema),
    });
    const { setError, formState: { isSubmitting }, control, handleSubmit } = form

    const onSubmit = async ({ email, password }) => {
        await login(email, password)
            .then(({ status, data }) => {
                if (status === 200) {
                    const role = data.user.role;
                    setToken(data.token)
                    setAuthenticated(true)
                    navigate(RedirectToRoute(role))
                }
            })
            .catch(({ response }) => {
                if (response.data.errors?.email) {
                    setError("email", {
                        type: "manual",
                        message: response.data.errors.email.join()
                    });
                }
                console.log(response);

            })

    };


    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-1/2 mx-auto bg-gradient-to-b from-sky-500 to-indigo-500 shadow-inner p-3 rounded" >
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
                                    placeholder="Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </>
                    )}
                />

                <Button disabled={isSubmitting} type="submit">
                    {isSubmitting && <LoaderPinwheel className='animate-spin mx-2' />}Login
                </Button>
            </form>
        </Form>
    );
}

export default UserLogin;
