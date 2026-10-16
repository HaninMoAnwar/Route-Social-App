import { Avatar, Button, Card, Spinner, toast } from '@heroui/react';
import { Image, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentSchema, type commentFormSchema } from '../../shcemas/commentSchema';
import { createComment, updateComment } from '../../services/comments.service';
import type { Comment } from '../../interfaces/comments';

interface CommentFormProps {
    postId: string;
    isUpdate: boolean;
    comment?: Comment;
    setIsUpdate?: (isUpdate: boolean) => void

}
export default function CommentForm({ postId, isUpdate, comment, setIsUpdate }: CommentFormProps) {
    const imageRef = useRef<HTMLInputElement | null>(null);
    const contentRef = useRef<HTMLTextAreaElement | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(comment?.image || "");
    const [commentIamge, setCommentIamge] = useState<File | undefined>(undefined);
    const [commentBody, setCommentBody] = useState<string>("");

    const { userToken, currentUserInfo } = useAuth();
    const queryClient = useQueryClient()

    let mutationKey;

    useEffect(() => {
        if (isUpdate) {
            mutationKey = ["updateComment", comment?._id]

            if (comment?.content && contentRef.current) {
                contentRef.current.value = comment?.content;
            }
        }
        else {
            mutationKey = ['createComment', postId]
        }

    }, [])

    const { handleSubmit, setValue, formState: { errors, isValid, isSubmitting } } = useForm<commentFormSchema>(

        {
            defaultValues: {
                content: '',
                image: undefined,

            },
            resolver: zodResolver(commentSchema),


        }
    )
    const { mutate } = useMutation({
        mutationKey: mutationKey,
        mutationFn: (data:commentFormSchema)=>onSubmit(data),
    })
    function onClickImageHandler() {
        if (imageRef.current) {
            imageRef.current.click();
        }
    }
    function onChangeImageHandler() {
        if (imageRef.current?.files) {
            const file = imageRef.current.files[0];
            setCommentIamge(file);

            setImagePreview(URL.createObjectURL(file));

            setValue('image', file, { shouldValidate: true })


        }
    }
    function onChangeBodyHandler() {
        if (contentRef.current) {
            setCommentBody(contentRef.current.value);

            setValue('content', contentRef.current.value, { shouldValidate: true })
        }

    }
    function onCloseImageHandler() {
        if (imageRef.current?.files) {
            URL.revokeObjectURL(imagePreview);
            setImagePreview("");
            imageRef.current.value = "";
            setCommentIamge(undefined)
            setValue('image', undefined, { shouldValidate: true })


        }
    }
    function onCancelCommentHandler() {
        onCloseImageHandler();
        if (contentRef.current) {
            contentRef.current.value = "";
        }
        setCommentBody("");
        setCommentIamge(undefined);
    }
    async function onSubmit(data:commentFormSchema) {
        
        const commentData = new FormData();
        if (commentBody) {

            commentData.append('content', commentBody)
        }
        if (commentIamge) {

            commentData.append('image', commentIamge)
        }

        let response;
        if (isUpdate && comment?._id) {

            response = await updateComment(userToken!, postId, comment._id, commentData)
            setIsUpdate!(false);
        }
        else {
            response = await createComment(userToken!, postId, commentData)

        }
        toast.success(response.data.message);
        onCancelCommentHandler();

        queryClient.invalidateQueries({ queryKey: ["allComments",postId] })
        queryClient.invalidateQueries({ queryKey: ["allPosts"] })
        queryClient.invalidateQueries({ queryKey: ["singlePost"] })


    }

    return (
        <>
            {errors.content && toast.danger(errors.content.message)}
            {errors.image && toast.danger(errors.image.message)}
            <form onSubmit={handleSubmit((data)=>mutate(data))}>
                <Card>
                    <Card.Header>
                        <Card.Title className='flex gap-3 items-center'>
                            <Avatar>
                                < Avatar.Image src={currentUserInfo?.photo}
                                    className="rounded-full border border-slate-200" />
                            </Avatar>
                        </Card.Title>
                        <Card.Description />
                    </Card.Header>
                    <Card.Content>
                        {/* Input Text Area */}
                        <textarea ref={contentRef} onChange={onChangeBodyHandler}
                            placeholder={`What is on your mind, ${currentUserInfo?.name}`}
                            className="w-full min-h-27.5 resize-none border border-slate-200 rounded-xl p-4 text-sm text-slate-700 bg-[#f8fafc] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                        />

                        <hr className="border-slate-100 my-2" />

                    </Card.Content>
                    <Card.Footer className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <input type="file" className='hidden' ref={imageRef} onChange={onChangeImageHandler} />
                            <Button variant='ghost' onClick={onClickImageHandler} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium text-xs md:text-sm transition-colors group">
                                <Image size={18} className="text-emerald-500 group-hover:scale-105 transition-transform" />
                                <span>Photo/video</span>
                            </Button>

                        </div>

                        <div className='flex items-center justify-between space-x-4'>
                            <Button onClick={onCancelCommentHandler} variant='ghost' className={`${!(commentBody || commentIamge) ? 'hidden' : ''} flex items-center gap-2 px-5 py-2 rounded-xl text-xs md:text-sm font-bold shadow-sm transition-all active:scale-[0.98]`}>
                                <span>Cancel</span>
                                <X size={14} />
                            </Button>
                            <Button isDisabled={!isValid || !(commentBody || commentIamge)} isPending={isSubmitting} type="submit" className="flex items-center gap-2  text-white px-5 py-2 rounded-xl text-xs md:text-sm font-bold shadow-sm transition-all active:scale-[0.98]">
                                {({ isPending }) => (
                                    <>
                                        {isPending ? <Spinner color="current" size="sm" /> : null}
                                        <span>Send</span>
                                        <Send size={14} />
                                    </>
                                )}
                            </Button>
                        </div>
                    </Card.Footer>
                    {imagePreview && <>
                        <button onClick={onCloseImageHandler} className='relative '>

                            <X size={30} className='absolute -top-2 -right-2 bg-blue-600 rounded-full p-1 text-white' />
                        </button>
                        <img src={imagePreview} alt={imagePreview} className="rounded-2xl" />
                    </>}
                </Card>
            </form>
        </>

    )
}
