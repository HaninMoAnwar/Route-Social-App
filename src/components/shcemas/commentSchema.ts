import * as z from "zod";


const MAX_FILE_SIZE = 20 * 1024 * 1024;

export const commentSchema = z.object({

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
    content:
        z.string()
            .trim()
            .max(5000, { message: "Your comment shouldn't exceed 5000 charcters" }).optional(),
},
).refine((data) => {
    const hasBody = data.content && data.content.trim().length > 0;
    const hasImage = data.image instanceof File;
    return hasBody || hasImage;
}, { path: ['content'] })

export type commentFormSchema = z.infer<typeof commentSchema>