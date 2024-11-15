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

  const formSchema = z.object({
    prenom: z.string().max(50),
    nom: z.string().max(50),
    birthdate: z.string(),
    gender: z.string().max(1),
    address: z.string().max(255),
    phone: z.string().max(10),
    email: z.string().email().min(2).max(30),
    password: z.string().min(8).max(30)
  })
  export default function ParentForm({handleSubmit,values}) {
    const navigate = useNavigate();
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: values || {}
    })
    const {setError, formState: {isSubmitting}, reset} = form
    const $isUpdate = values !== undefined
    const onSubmit = async values => {
        const loadermsg = $isUpdate?'Updating in progress':'Adding in progress'
        const loader = toast.loading(loadermsg)

        await handleSubmit(values).then(
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
        <form className={$isUpdate ? "space-y-4" : ""} onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="prenom"
            render={({field}) => (
              <FormItem>
                <FormLabel>prenom</FormLabel>
                <FormControl>
                  <Input placeholder="prenom" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nom"
            render={({field}) => (
              <FormItem>
                <FormLabel>nom</FormLabel>
                <FormControl>
                  <Input placeholder="nom" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthdate"
            render={({field}) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <Input type={'date'} placeholder="Date of birth" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({field}) => (
              <FormItem className="space-y-3">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="m"/>
                      </FormControl>
                      <FormLabel className="font-normal">
                        Male
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="f"/>
                      </FormControl>
                      <FormLabel className="font-normal">
                        Female
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({field}) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Address"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            type={'tel'}
            render={({field}) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type={'password'} placeholder="Password" {...field} />
                </FormControl>
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