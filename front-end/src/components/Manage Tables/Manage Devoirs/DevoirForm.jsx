  import * as z from "zod"
  import {useForm} from "react-hook-form";
  import {zodResolver} from "@hookform/resolvers/zod";
  import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
  import {Input} from "../../ui/input";
  import {Button} from "../../ui/button";
  import ParentApi from '../../../services/api/ParentApi';
  import {RadioGroup, RadioGroupItem} from '../../ui/radio-group'
  import {Textarea} from "../../ui/textarea";
  import { CalendarIcon, Loader } from "lucide-react";
  import { ADMIN_MANAGE_PARENTS_ROUTE } from "../../../router";
  import { useNavigate } from "react-router-dom";
  import { toast } from "sonner";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

import TeacherApi from "../../../services/api/TeacherApi";
import { useEffect, useState } from "react";
import UserApi from "../../../services/api/UserApi";
import ClassesApi from "../../../services/data-tables/ClassesApi";
import ModuleApi from "../../../services/data-tables/ModuleApi";

  const formSchema = z.object({
    title: z.string().max(50),
    description: z.string().max(244),
    file_path: z.instanceof(FileList)
    .transform(list => list.item(0))
    .refine((file) => file !== null, "File is required")
    .refine((file) => file?.type === "application/pdf", "File must be a PDF"),
        teacher_id: z.string().max(2),
    class_id: z.string().max(2),
    module_id: z.string().max(2),
  })
  export default function DevoirForm({handleSubmit,values}) {
    const navigate = useNavigate();
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: values || {}
    })

    const [Teacher, setTeacher] = useState([])
    useEffect(() => {
      TeacherApi.all(['id','nom','prenom']).then(({data}) => setTeacher(data.data)) 
    }, [])
    const [Classe, setClasse] = useState([])
    useEffect(() => {
      ClassesApi.all(['id','code']).then(({data}) => setClasse(data.data)) 
    }, [])
    const [Module, setModule] = useState([])
    useEffect(() => {
      ModuleApi.all(['id','name']).then(({data}) => setModule(data.data)) 
    }, [])
    const {setError, formState: {isSubmitting}, reset} = form
    const $isUpdate = values !== undefined
    const onSubmit = async values => {
        const loadermsg = $isUpdate?'Updating in progress':'Adding in progress'
        const loader = toast.loading(loadermsg)
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('file_path', values.file_path); // Ensure it's a File object
        formData.append('teacher_id', values.teacher_id);
        formData.append('class_id', values.class_id);
        formData.append('module_id', values.module_id);
        await handleSubmit(formData).then(
        ({status, data}) => {
          if (status === 200) {
            toast.dismiss(loader)
            toast.success(data.message)
            reset()
            navigate(ADMIN_MANAGE_PARENTS_ROUTE)
          }

        }).catch(({all}) => {
          Object.entries(response.data.errors).forEach((error) => {
            const [fieldName, errorMessages] = error
              setError(fieldName, {
                message: errorMessages.join()
              })
        })
        })
    }

    return <>
      <Form {...form}>
        <form className={$isUpdate ? "space-y-4" : ""} encType="multipart/form-data" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          
          <FormField
  control={form.control}
  name="file_path"
  render={({field: { onChange, value, ...field }}) => (
    <FormItem>
      <FormLabel>Devoir File</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept=".pdf"
          onChange={(e) => onChange(e.target.files)}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
          <FormField
          control={form.control}
          name="teacher_id"
          render={({field}) => (
            <FormItem>
              <FormLabel>Teacher</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Teacher'/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Teacher.map((teacher, key) =>
                    <SelectItem key={key} value={teacher.id.toString()}>{teacher.nom} {teacher.prenom}</SelectItem>)
                  } 
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="class_id"
          render={({field}) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Class'/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Classe.map((classe, key) =>
                    <SelectItem key={key} value={classe.id.toString()}>{classe.code}</SelectItem>)
                  } 
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="module_id"
          render={({field}) => (
            <FormItem>
              <FormLabel>Module</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Module'/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Module.map((module, key) =>
                    <SelectItem key={key} value={module.id.toString()}> {module.name} </SelectItem>)
                  } 
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
          
          <Button className={'mt-3'} type="submit">
            {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'}/>} {' '}
            {$isUpdate ?'Update':'Create'}
          </Button>
        </form>
      </Form>
    </>
  }