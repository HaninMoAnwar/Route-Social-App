import { Button, Card, FieldError, Input, Label, Spinner, TextField, toast } from "@heroui/react";
import { Check, KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { newPasswordSchema, type newPasswordFormSchema } from "../../components/shcemas/newPasswordShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "../../components/services/user.service";
import { useAuth } from "../../components/contexts/AuthContext";
import type newPasswordData from "../../components/interfaces/newPassword";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const { userToken, saveUserToken } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<newPasswordFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      newRePassword: '',
    },
  });

  async function onSubmit(data: newPasswordFormSchema) {
    const formData: newPasswordData = {
      password: data.password,
      newPassword: data.newPassword
    }
    try {
      const { data: { message, data: { token } } } = await changePassword(userToken!, formData);
      toast.success(message);
      saveUserToken(token);
      navigate("/");
    }
    catch (error) {
      if (isAxiosError(error)) {
        toast.danger(error.response?.data.message)
      }
    }


  }
  return (
    <>
      <div className="min-h-screen bg-light-gray">
        <form className="bg-white max-w-3xl rounded-2xl m-auto p-5" onSubmit={handleSubmit(onSubmit)}>
          <Card variant="transparent" className="ps-0">
            <Card.Header>
              <div className="grid  grid-cols-12">
                <div className="col-span-1 m-auto bg-light-blue p-3 rounded-full">

                  <KeyRound size={24} className="text-brand-blue" />
                </div>
                <div className="col-span-11">
                  <Card.Title className="text-2xl font-bold font-sans"> Change Password</Card.Title>
                  <Card.Description> Keep your account secure by using a strong password.</Card.Description>
                </div>
              </div>
            </Card.Header>
          </Card>
          <div className="flex flex-col gap-4 p-2">
            <TextField
              type="password">
              <Label>Current password</Label>
              <Input {...register("password")} placeholder="Enter current password" />
              {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}

              <FieldError />
            </TextField>
            <TextField
              type="password">
              <Label>New password</Label>
              <Input {...register("newPassword")} placeholder="Enter new password" />
              {errors.newPassword && <p className="text-xs text-red-600">{errors.newPassword.message}</p>}
              <FieldError />
            </TextField>
            <TextField
              type="password">
              <Label>Confirm new password</Label>
              <Input {...register("newRePassword")} placeholder="Re-enter new password" />
              {errors.newRePassword && <p className="text-xs text-red-600">{errors.newRePassword.message}</p>}
              <FieldError />
            </TextField>
            <Button isDisabled={!isValid} className="w-full" type="submit">
              {isSubmitting ? <Spinner color="current" size="sm" /> : <Check />}
              Update Passowrd
            </Button>

          </div>
        </form>
      </div>
    </>
  )
}
