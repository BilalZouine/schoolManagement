import React from 'react';
import { useForm } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
    Form

} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


function StudentLogin() {

    const form = useForm({
        // resolver: yupResolver(formSchema),
        defaultValues: {
            email: 'bilalzouine9@gmail.com',
            password: '123456789'
        }
    });
    const { setError, formState: { isSubmitting }, control, handleSubmit } = form


    const submitForm = (data) => {
        console.log(data);

    }

    return (

        <Form {...form}>
            <form onSubmit={handleSubmit(submitForm)} className='space-y-2 w-3/4 mx-auto bg-blue-400 p-3 rounded '>

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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Entre your email account"
                                    {...field}

                                />
                            </FormControl>
                            <FormMessage />
                        </>
                    )}
                />

                <Button type="submit" className='p-2 h-7 mx-auto bg-green-600 hover:bg-green-800 '>Submit</Button>
            </form>

        </Form>


    );
}

export default StudentLogin;
