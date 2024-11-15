import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form.tsx";
import { Input } from "../components/ui/input.tsx";
import { Button } from "../components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import {redirectToDashboard} from '../router/index.jsx'
import { Loader } from "lucide-react";
import{ useUserContext } from "../context/StudentContext.jsx"

const formSchema = z.object({
    email: z.string().email().min(5).max(30),
    password: z.string().min(8).max(150),
});
export default function LoginInterface() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  
  });

  const {setError, formState: {isSubmitting}} = form
  const navigate = useNavigate();
  const {login, setAuthenticated ,setToken} = useUserContext()

  const onSubmit = async values => {
    await login(values.email, values.password).then(
        ({ status, data }) => {
            if (status === 200) {
                setToken(data.token);
                setAuthenticated(true);
                const { role } = data.user;
                navigate(redirectToDashboard(role))
            }
        }).catch(({ response }) => {
        setError('email', {
            message: response.data.errors.email.join()
        });
    });
};
   return (
    <div className="container mx-auto max-w-lg ">
            <h1 className={'text-3xl mb-8'}>Student login</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Root error message */}
          {form.formState.errors.root && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              {form.formState.errors.root.message}
            </div>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Enter your password" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<Button className={'mt-2'} disabled={isSubmitting} type="submit">
          {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'}/>} {' '} Login
        </Button>
            </form>
      </Form>
    </div>
  );
}