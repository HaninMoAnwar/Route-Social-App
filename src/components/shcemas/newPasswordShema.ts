import * as z from "zod";


export const newPasswordSchema = z.object({
    
    password:
        z.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                { message: 'Your password should have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character' }),
    newPassword:
        z.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                { message: 'Your password should have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character' }
            ),
    newRePassword:
        z.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                { message: 'Your password should have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character' }
            ),
})
.refine((data) => {
    return data.newPassword === data.newRePassword
}, { message: 'Passsowrds are not matched' ,path:['newRePassword']})

export type newPasswordFormSchema = z.infer<typeof newPasswordSchema>;