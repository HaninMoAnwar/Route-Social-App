import { Button, Input, Label, Radio, RadioGroup, Spinner, toast } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { registerSchema, type registerFormSchema } from "../../shcemas/registerSchema";
import type registerFormData from "../../interfaces/resigter";
import axios, { isAxiosError } from "axios";
import { baseUrl, signUpUrl } from "../../sharedLinks/urls";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
export default function RegisterForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<registerFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      dateOfBirth: '',
      gender: 'male',
      password: '',
      rePassword: '',
    },
  });

  const {saveUserToken} = useAuth();
  async function onSubmit(formData: registerFormData) {

    try {
      const { data: { message, data: { token } } } = await axios.request({
        url: `${baseUrl}${signUpUrl}`,
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
      <div className="mb-2">
        <h3 className="text-2xl font-bold text-brand-dark-blue">Create a new account</h3>
        <p className="text-sm text-gray-400 mt-1">It is quick and easy.</p>
      </div>


      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">

        <Input {...register('name')} type="text" className="w-full border-2" placeholder="Enter your name" />
        {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        <Input {...register('username')} type="text" className="w-full border-2" placeholder="Enter your user name" />
        {errors.username && <p className="text-xs text-red-600">{errors.username.message}</p>}
        <Input {...register('email')} type="email" className="w-full border-2" placeholder="Enter your email" />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        <Input {...register('dateOfBirth')} type="date" className="w-full border-2" placeholder="Enter your date of birth" />
        {errors.dateOfBirth && <p className="text-xs text-red-600">{errors.dateOfBirth.message}</p>}
        <Input {...register('password')} type="password" className="w-full border-2" placeholder="Enter your passowrd" />
        {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
        <Input {...register('rePassword')} type="password" className="w-full border-2" placeholder="Enter your passowrd again" />
        {errors.rePassword && <p className="text-xs text-red-600">{errors.rePassword.message}</p>}

        <RadioGroup name="gender" orientation="horizontal">
          <Label className="w-full">Gender</Label>
          <Radio {...register('gender')} value="female">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Female
            </Radio.Content>
          </Radio>
          <Radio {...register('gender')} value="male" >
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Male
            </Radio.Content>
          </Radio>
        </RadioGroup>
        {errors.gender && <p className="text-xs text-red-600">{errors.gender.message}</p>}

        <Button isDisabled={!isValid} isPending={isSubmitting} type="submit" className="w-full">
          {({ isPending }) => (
            <>
              {isPending ? <Spinner color="current" size="sm" /> : null}
              Sign Up
            </>
          )}
        </Button>
      </form >
    </>

  );

}
