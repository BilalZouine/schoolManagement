import React from 'react';
import { useForm } from 'react-hook-form';
function Login() {
    const form = useForm()

    return (

        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />

    );
}

export default Login;
