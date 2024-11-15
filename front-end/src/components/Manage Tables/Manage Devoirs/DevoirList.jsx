import { useEffect, useState } from "react"
import ParentApi from "../../../services/api/ParentApi"
import { DataTable } from "../../Data-table/DataTable"
import {Button} from "../../ui/button";
import {DownloadCloud, Trash2Icon} from "lucide-react";
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
import ParentForm from "./DevoirForm";
import DevoirApi from "../../../services/data-tables/DevoirApi";
import DevoirForm from "./DevoirForm";
export default function DevoirList(){

    const DevoirColumns = [
        {
          accessorKey: "id",
          header: ({ column }) => {
            return <DataTableColumnHeader  column={column} title="#ID" />
      
          },
        },
        {
          accessorKey: "title",
          header: ({ column }) => {
            return <DataTableColumnHeader  column={column} title="title" />
          },
        },
        {
          accessorKey: "Description",
          header: ({ column }) => {
            return <DataTableColumnHeader  column={column} title="Description" />
      
          },
        },
        {
          accessorKey: "teacher_id",
          header: "teacher_id",
          cell: ({ row }) => <div>{row.getValue("teacher_id")}</div>,
        },
        {
          accessorKey: "class_id",
          header: "class_id",
          cell: ({ row }) => <div>{row.getValue("class_id")}</div>,
        },
        {
          accessorKey: "module_id",
          header: "module_id",
          cell: ({ row }) => <div>{row.getValue("module_id")}</div>,
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
          accessorKey: "file_path",
          header: ({ column }) => <DataTableColumnHeader column={column} title="File" />,
          cell: ({ row }) => {
            const filePath = row.getValue("file_path");
            const fileUrl = `${import.meta.env.VITE_BACKEND_URL}/storage/${filePath}`;
            
            // Extract filename from path
            const fileName = 'Download File';
            
            return (
              <div className="flex items-center">
                <a 
                  href={fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
                > 
                  <DownloadCloud/>
                 
                   
                  {fileName}
                </a>
              </div>
            );
          },
          enableSorting: false,
        },

        {
          accessorKey: "Actions",
            cell: ({row}) => {
              const {id , title} = row.original
              const [OpenDialogue, setOpenDialogue] = useState(false)
              return (<>
              <div className={'flex gap-x-1'}>
              <Sheet  open={OpenDialogue} onOpenChange={setOpenDialogue}>
                <SheetTrigger>
                <Button size={'sm'} className="mx-2">Update</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Update Devoir : {title}</SheetTitle>
                    <SheetDescription>
                    Make changes to your devoir here. Click save when you're done.
                        <DevoirForm values={row.original} handleSubmit={(values) => {
                          const promise = DevoirApi.update(id, values)
                          promise.then((response) => {
                            const {devoir} = response.data
                            const elements = data.map((item) => {
                              if (item.id === id){
                                return devoir
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
                        <span className={'font-bold'}> {title}</span> ?
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
                        const {data: deletedParent, status} = await DevoirApi.delete(id)
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
      DevoirApi.all().then(({data}) => setdata(data.data))
    }, [])
    return <>
        <DataTable columns={DevoirColumns} data={data}/>
    </>
}