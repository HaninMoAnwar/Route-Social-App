import * as z from "zod";


const MAX_FILE_SIZE = 20 * 1024 * 1024;

export const postSchema = z.object({

    image:
        z.file()
            .refine((value) => {

                return [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/webp"]
                    .includes(value.type) && value.size <= MAX_FILE_SIZE
            }
                , { message: "Image type is invalid" })
            .optional(),
    body:
        z.string()
            .trim()
            .max(5000, { message: "Your post shouldn't exceed 5000 charcters" }).optional(),
    privacy: z.string()
},
).refine((data) => {
    const hasBody = data.body && data.body.trim().length > 0;
    const hasImage = data.image instanceof File;
    return hasBody || hasImage;
}, { path: ['body'] })

export type postFormSchema = z.infer<typeof postSchema>