import { useEffect, useState } from "react"
import ParentApi from "../../../services/api/ParentApi"
import { DataTable } from "../../Data-table/DataTable"
import {Button} from "../../ui/button";
import {Trash2Icon} from "lucide-react";
import { DataTableColumnHeader } from "../../Data-table/DataTableColumnHeader ";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
  } from "../../ui/alert-dialog";
  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../../ui/sheet"
import { toast } from "sonner";
import ParentForm from "./ParentForm";
export default function ParentStudentList(){

    const ParentStudentColumns = [
        {
          accessorKey: "id",
          header: ({ column }) => {
            return <DataTableColumnHeader  column={column} title="#ID" />
      
          },
        },
        {
          accessorKey: "prenom",
          header: ({ column }) => {
            return <DataTableColumnHeader  column={column} title="Prenom" />
          },
        },
        {
          accessorKey: "nom",
          header: ({ column }) => {
            return <DataTableColumnHeader  column={column} title="Nom" />
      
          },
        },
        {
          accessorKey: "birthdate",
          header: "Date of birth",
          cell: ({ row }) => {
            const date = (row.getValue("birthdate"))
            const formatted = new Date(date).toLocaleString().split(",")[0];
            return <div className="text-right font-medium">{formatted}</div>
          },
        },
        {
          accessorKey: "email",
          header: ({ column }) => {
            return <DataTableColumnHeader  column={column} title="Email" />
      
          },
        },
        {
          accessorKey: "gender",
          header: "Gender",
          cell: ({row}) => {
            const value = row.getValue("gender")
            const gender = value === 'm' ? 'Male' : 'Female'
            return <>{gender}</>
          },
        },
        {
          accessorKey: "address",
          header: ({ column }) => {
            return <DataTableColumnHeader  column={column} title="Address" />
      
          },
        },
        {
          accessorKey: "phone",
          header: "Phone",
          cell: ({row}) => {
            const phone = row.getValue("phone")
            return <div className="text-right font-medium">+212-{phone}</div>
          },
        },
        
        {
          accessorKey: "formatted_updated_at",
          header: "Last Update",
          cell: ({row}) => {
            const formatted_updated_at = row.getValue("formatted_updated_at")
            return <div className="text font-medium">{formatted_updated_at}</div>
          },
        },
        {
          accessorKey: "Actions",
            cell: ({row}) => {
              const {id , prenom , nom} = row.original
              const [OpenDialogue, setOpenDialogue] = useState(false)
              return (<>
              <div className={'flex gap-x-1'}>
              <Sheet  open={OpenDialogue} onOpenChange={setOpenDialogue}>
                <SheetTrigger>
                <Button size={'sm'} className="mx-2">Update</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Update Parent {prenom} {nom} </SheetTitle>
                    <SheetDescription>
                    Make changes to your parent here. Click save when you're done.
                        <ParentForm values={row.original} handleSubmit={(values) => {
                          const promise = ParentApi.update(id, values)
                          promise.then((response) => {
                            const {parent} = response.data
                            const elements = data.map((item) => {
                              if (item.id === id){
                                return parent
                              }
                              return item
                            })
                            setdata(elements)
                            setOpenDialogue(false)
                          })
                          return promise 
                        }}/>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={'sm'} >Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure to delete
                        <span className={'font-bold'}> {prenom} {nom}</span> ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={ async () => {
                        const deletingLoader = toast.loading('Deleting in progress.')
                        const {data: deletedParent, status} = await ParentApi.delete(id)
                        toast.dismiss(deletingLoader)
                        if (status === 200 ){
                            toast.success('Parent deleted',{
                                description: `Parent deleted successfully ${deletedParent.data.firstname} ${deletedParent.data.lastname}`,
                                icon: <Trash2Icon/>
                              })
                              setdata(data.filter((parent) => parent.id !== id))
                        }else {
                            toast.error('Error deleting parent');
                          }
                        console.log(response)
                      }} >Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                </div>
                </>
                          )
            },
          },
      ]

    const [data, setdata] = useState([])
      useEffect(() => {
        ParentApi.all().then(({data}) => setdata(data.data))
      }, [])
    return <>
        <DataTable columns={ParentStudentColumns} data={data}/>
    </>
}