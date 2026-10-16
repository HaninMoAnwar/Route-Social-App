import * as z from "zod";


export const registerSchema = z.object({
    name:
        z.string().trim()
            .min(2,
                { message: 'Your name should be more than 2 characters' })
            .max(50,
                { message: 'Your name should be less than 50 characters' }),
    username:
        z.string().trim()
            .min(2,
                { message: 'Your name should be more than 2 characters' })
            .max(50,
                { message: 'Your name should be less than 50 characters' }),
    email:
        z.email(),
    dateOfBirth:
        z.string().refine((value: string) => {
            const currentDate = new Date();
            const inputDate = new Date(value);
            return (currentDate.getFullYear() - inputDate.getFullYear() >= 16)
        }, { message: 'Your age should be greater than or equal 16' }),
    gender:
        z.enum(["male", "female"],
            { message: 'Please select your gender' }),
    password:
        z.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                { message: 'Your passord at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character' }),
    rePassword:
        z.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                { message: 'at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character' }
            ),
}).refine((data) => {
    return data.password === data.rePassword
}, { message: 'Passsowrds are not matched' ,path:['rePassword']})

export type registerFormSchema = z.infer<typeof registerSchema>;