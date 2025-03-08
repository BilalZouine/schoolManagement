


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"

import { LoaderPinwheel, PlusCircle, X } from "lucide-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner"

import { useForm } from "react-hook-form";
export const formSchema = yup.object({
    firstname: yup
        .string()
        .required("First name is required *")
        .min(3, "The First Name field must be at least 3 characters *"),

    lastname: yup
        .string()
        .required("Last Name is required *")
        .min(3, "The Last Name field must be at least 3 characters *"),

    email: yup
        .string()
        .email("Invalid email format *")
        .required("Email is required *"),

    phone: yup
        .string()
        .matches(/^\+?[0-9]\d{1,14}$/, "Invalid phone number format *")
        .required("Phone number is required *")
        .max(15, "The phone field to match must be less than 15 characters *"),

    password: yup
        .string()
        .min(8, "Password must be at least 8 characters *")
        .nullable("Password is required *"),
    address: yup
        .string()
        .required("Address is required *")
        .min(3, "The address field must be between 3 and 255 characters *")
    ,
    gendre: yup.string().oneOf(["M", "F"], "Invalid gendre *").required("Gendre is required *"),
    blood_type: yup.string()
        .oneOf(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], "Invalid blood type *")
        .required("Blood type is required *"),
    date_of_birth: yup
        .string()
        .required("Date og birth is required *")
});


function ParentUpsertCreate({ handleUpsertParent, values }) {


    const form = useForm({
        resolver: yupResolver(formSchema),

        defaultValues: values ? { ...values, gendre: values.gendre === 'm' ? "M" : 'F' } : {}
    })
    
    const { handleSubmit, control, setError, formState: { isSubmitting } } = form
    const isUpdate = values !== undefined;

    const submitForm = async (parentInfo) => {
        const loaderMsg = isUpdate ? "Updating in progress" : "Create in progress"
        const loader = toast.loading(loaderMsg)
        await handleUpsertParent(parentInfo)
            .then(({ status, data,message }) => {
                toast.dismiss(loader)
                if (status === 200) {
                    toast.success( data.message,{
                        duration: 5000,
                        action: {
                            label: <X />
                        },
                    })
                }
            })
            .catch(({ response }) => {
                const { status, data } = response ?? {};
                if (status === 422) {
                    Object.entries(data.errors).forEach((error) => {
                        const [fieldName, eroorMessage] = error
                        setError(fieldName, {
                            message: eroorMessage
                        });

                    });
                }
            });

    }
    return (

        <Form {...form}>{

        }

            <form onSubmit={handleSubmit(submitForm)} className="space-y-2 p-3 rounded">
                <FormField
                    name="firstname"
                    control={control}
                    render={({ field }) => (
                        <>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter your First Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </>
                    )}
                />

                <FormField
                    name="lastname"
                    control={control}
                    render={({ field }) => (
                        <>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter your Last Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </>
                    )}
                />

                <FormField
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter your Email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </>
                    )}
                />

                <FormField
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input
                                    type="tel"
                                    placeholder="Enter your Phone Number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </>
                    )}
                />


                <FormField
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your Address"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </>
                    )}
                />

                <FormField
                    name="date_of_birth"
                    control={control}
                    render={({ field }) => (
                        <>
                            <FormLabel>Date of birth</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </>
                    )}
                />

                <FormField
                    name="gendre"
                    control={control}
                    render={({ field }) => (
                        <>
                            <FormLabel>Gendre</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="M" name="r1" />
                                        <Label htmlFor="r1">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="F" name="r1" />
                                        <Label htmlFor="r2">Female</Label>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />

                        </>
                    )}
                />

                <FormField
                    name="blood_type"
                    control={control}
                    render={({ field }) => (
                        <>
                            <FormLabel>Blood Type</FormLabel>
                            <FormControl>

                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Blood Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Blood Types</SelectLabel>
                                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type, index) => (
                                                <SelectItem key={index} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

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
                                    placeholder="Enter your Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </>
                    )}
                />


                <Button disabled={isSubmitting} type="submit" className="w-full font-bold text-white bg-green-600 hover:bg-green-700">
                    {isSubmitting && <LoaderPinwheel className="animate-spin mx-2" />}{isUpdate ? "Update Parent" : "Add Parent"}
                </Button>
            </form>
        </Form>
    );
}

export default ParentUpsertCreate;
