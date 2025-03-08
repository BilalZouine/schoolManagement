import React, { useEffect, useState } from 'react';
import { DataTable } from './dataTable';
import { useParentContext } from '../../context/parentContext';
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { toast } from "sonner"


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ParentApi } from '../../service/api/student/parentApi';
import { Trash2Icon, X } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import ParentUpsertCreate from '../forms/parentUpsertCreate';


function AdminParantList() {
    const { getAllParents, setParents, parents } = useParentContext()
    const [data, setData] = useState(parents)


    const AdminParantColums = [
        {
            accessorKey: "id",
            header: ({ column }) => <DataTableColumnHeader column={column} title="#ID" />,

        },
        {
            accessorKey: "firstname",
            header: ({ column }) => <DataTableColumnHeader column={column} title="First NAME" />,

        },
        {
            accessorKey: "lastname",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Last Name" />,

        },
        {
            accessorKey: "email",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
            cell: ({ row }) => {
                const email = row.getValue('email')
                return (email).split("@")[0] + '@...'
            }
        },
        {
            accessorKey: "phone",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Phone Number" />,

        },
        {
            accessorKey: "gendre",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Gendre" />,


        },
        {
            accessorKey: "date_of_birth",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Date Of Birth" />,


        },
        {
            accessorKey: "blood_type",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Blood type" />,


        },
        {
            accessorKey: "address",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Address" />,



        },
        {
            accessorKey: "updated_at",
            header: ({ column }) => <DataTableColumnHeader column={column} title="updated_at" />,

            cell: ({ row }) => {
                const date = row.getValue('updated_at')
                return new Date(date).toString()
            }

        },
        {

            accessorKey: "action",
            header: ({ column }) => 'Action',

            cell: ({ row }) => {
                const { id, firstname, lastname } = row.original
                const [openUpdateDialog, setOpenUpdateDialog] = useState(false)

                return (

                    <div className='flex'>
                        <Sheet
                            open={openUpdateDialog}
                            onOpenChange={setOpenUpdateDialog}
                        >
                            <SheetTrigger>
                                <span className='p-2 text-white rounded me-2 bg-green-600 hover:bg-green-700'>Update</span>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Update parant</SheetTitle>

                                </SheetHeader>
                                <div className="grid gap-4 py-4 overflow-auto h-full pb-28 ">
                                    <ParentUpsertCreate values={row.original} handleUpsertParent={(value) => {

                                        const promise = ParentApi.update(id, value)
                                        promise.then(({ data: response }) => {                                            
                                            setOpenUpdateDialog(false)
                                            setData(data.map(p => p.id === response.data.id ? response.data:p ))
                                        })
                                        return promise;

                                    }}
                                    />

                                </div>
                            </SheetContent>
                        </Sheet>


                        <AlertDialog >
                            <AlertDialogTrigger asChild>
                                <Button variant={"destructive"}>Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure to delete? <span className="font-bold">{firstname} {lastname}</span></AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this account
                                        and remove data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={async () => {
                                            const DeletingLoader = toast.loading('deleting in progress')
                                            const { data: deletedParent, status } = await ParentApi.delete(id)
                                            toast.dismiss(DeletingLoader)
                                            if (status === 200) {
                                                setData(data.filter((parent) => parent.id !== id))
                                                toast.success('Parent Deleted', {
                                                    description: `Parent deleted successFully ${deletedParent.firstname, deletedParent.lastname}`,
                                                    action: {
                                                        label: <X />
                                                    },
                                                    duration: 5000,
                                                })
                                                icon: <Trash2Icon />
                                            }

                                        }}
                                    >
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>


                )
            }

        }
    ]

    useEffect(() => {
        if (parents.length === 0) {
            getAllParents()
                .then(({ data }) => {
                    setData(data)
                    setParents(data)

                })
                .catch((resan) => {
                    console.log(resan);

                })


            setData([])
        }
    }, [])

    return (
        <DataTable columns={AdminParantColums} data={data} />
    );
}

export default AdminParantList;
