import { useForm } from "react-hook-form";
import { loginSchema, type loginFormSchema } from "../../shcemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type loginFormData from "../../interfaces/login";
import axios, { isAxiosError } from "axios";
import { baseUrl, loginUrl } from "../../sharedLinks/urls";
import { Button, Input, Spinner, toast } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext"

export default function LoginForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<loginFormSchema>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });
  
  const {saveUserToken} = useAuth();
  async function onSubmit(formData: loginFormData) {

    try {
      const { data:{message,data:{token} }} = await axios.request({
        url: `${baseUrl}${loginUrl}`,
        method: 'post',
        data: formData
      });
      saveUserToken(token);
      toast.success(message);

      navigate('/');

    } catch (error) {
      if (isAxiosError(error)) {

        toast.danger(error.response?.data.message);
      }
    }
  }
  return (
    <>

      {/* Heading */}

      <div className="mb-2" >
        <h3 className="text-2xl font-bold text-brand-dark-blue">Log in to Route Posts</h3>
        <p className="text-sm text-gray-400 mt-1">Log in and continue your social journey.</p>
      </div >


      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">

        <Input {...register('email')} type="email" className="w-full border-2" placeholder="Enter your email" />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        <Input {...register('password')} type="password" className="w-full border-2" placeholder="Enter your passowrd" />
        {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}

        <Button isDisabled={!isValid} isPending={isSubmitting} type="submit" className="w-full">
          {({ isPending }) => (
            <>
              {isPending ? <Spinner color="current" size="sm" /> : null}
              Login
            </>
          )}
        </Button>
      </form >
    </>

  );

}

