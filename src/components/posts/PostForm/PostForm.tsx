import { Avatar, Button, Card, Spinner, toast } from '@heroui/react';
import { Globe, ChevronDown, Image, Send, X, Users, Lock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { createPost, updatePost } from '../../services/posts.service';
import { useAuth } from '../../contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, type postFormSchema } from '../../shcemas/postSchema';
import type { Post } from '../../interfaces/post';

interface PostFormProps {
    isUpdate: boolean;
    post?: Post;
    setIsUpdate?: (isUpdate:boolean) => void
}
export default function PostForm({ isUpdate, setIsUpdate,post }: PostFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const bodyRef = useRef<HTMLTextAreaElement | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(post?.image || "");
    const [postIamge, setPostIamge] = useState<File | undefined>(undefined);
    const [postBody, setPostBody] = useState<string>("");

    const { userToken, currentUserInfo } = useAuth();
    const queryClient = useQueryClient()

    let mutationKey;
    useEffect(() => {
        if (isUpdate) {
            mutationKey = ["updatePost", post?._id]

            if (post?.body && bodyRef.current) {
                bodyRef.current.value = post?.body;
            }
        }
        else {
            mutationKey = ['createPost']
        }

    }, [])
    const { control, handleSubmit, setValue, formState: { errors, isValid, isSubmitting } } = useForm<postFormSchema>(
        
        {
            defaultValues: {
                body: '',
                image: undefined,
                privacy:  post?.privacy?  post?.privacy : "public"

            },
            resolver: zodResolver(postSchema),


        }
    )
    const { mutate } = useMutation({
        mutationKey: mutationKey,
        mutationFn: onSubmit,
    })
    function onClickImageHandler() {
        if (imageRef.current) {
            imageRef.current.click();
        }
    }
    function onChangeImageHandler() {
        if (imageRef.current?.files) {
            const file = imageRef.current.files[0];
            setPostIamge(file);

            setImagePreview(URL.createObjectURL(file));

            setValue('image', file, { shouldValidate: true })


        }
    }
    function onChangeBodyHandler() {
        if (bodyRef.current) {

            setPostBody(bodyRef.current.value);

            setValue('body', bodyRef.current.value, { shouldValidate: true })
        }

    }
    function onCloseImageHandler() {
        if (imageRef.current?.files) {
            URL.revokeObjectURL(imagePreview);
            setImagePreview("");
            imageRef.current.value = "";
            setPostIamge(undefined)
            setValue('image', undefined, { shouldValidate: true })
        }
    }
    function onCancelPostHandler() {
        onCloseImageHandler();
        if (bodyRef.current) {
            bodyRef.current.value = "";
        }
        setPostBody("");
        setPostIamge(undefined);
    }
    async function onSubmit({ privacy }: postFormSchema) {

        const postData = new FormData();
        if (postBody) {

            postData.append('body', postBody)
        }
        if (postIamge) {

            postData.append('image', postIamge)
        }
        postData.append('privacy', privacy)

        let response;
        if (isUpdate && post?._id) {

            response = await updatePost(userToken!, post?._id, postData)
            setIsUpdate!(false);
        }
        else {
            response = await createPost(userToken!, postData)

        }
        toast.success(response.data.message);
        onCancelPostHandler();

        queryClient.invalidateQueries({ queryKey: ["allPosts"] })


    }

    return (
        <>
            {errors.body && toast.danger(errors.body.message)}
            {errors.image && toast.danger(errors.image.message)}
            {errors.privacy && toast.danger(errors.privacy.message)}
            <form onSubmit={handleSubmit((data) => mutate(data))}>
                <Card>
                    <Card.Header>
                        <Card.Title className='flex gap-3 items-center'>
                            <Avatar>
                                < Avatar.Image src={currentUserInfo?.photo}
                                    className="w-10 h-10 border border-slate-200" />
                            </Avatar>
                            <div>
                                <h4 className="text-sm font-bold text-brand-dark-blue leading-tight my-2">{currentUserInfo?.name}</h4>
                                <Controller
                                    name="privacy"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="relative inline-block text-left">

                                            <button
                                                type="button"
                                                onClick={() => setIsOpen(!isOpen)}
                                                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-600"
                                            >
                                                {field.value === "public" && <Globe size={12} />}
                                                {field.value === "following" && <Users size={12} />}
                                                {field.value === "only_me" && <Lock size={12} />}
                                                <span className="capitalize">{field.value.replace("_", " ")}</span>
                                                <ChevronDown size={12} />
                                            </button>

                                            {/* DROPDOWN MENU */}
                                            {isOpen && (
                                                <div className="absolute left-0 mt-1 min-w-40 bg-white border border-slate-200 rounded-md shadow-md py-1 z-50">

                                                    {/* PUBLIC */}
                                                    <div
                                                        onClick={() => { field.onChange("public"); setIsOpen(false); }}
                                                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 text-xs cursor-pointer text-slate-700"
                                                    >
                                                        <Globe size={12} /> <span>Public</span>
                                                    </div>

                                                    {/* FOLLOWING */}
                                                    <div
                                                        onClick={() => { field.onChange("following"); setIsOpen(false); }}
                                                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 text-xs cursor-pointer text-slate-700"
                                                    >
                                                        <Users size={12} /> <span>Following</span>
                                                    </div>

                                                    <hr className="border-slate-100 my-1" />

                                                    {/* ONLY ME */}
                                                    <div
                                                        onClick={() => { field.onChange("only_me"); setIsOpen(false); }}
                                                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 text-xs cursor-pointer text-slate-700"
                                                    >
                                                        <Lock size={12} /> <span>Only me</span>
                                                    </div>

                                                </div>
                                            )}
                                        </div>
                                    )}
                                />

                            </div>
                        </Card.Title>
                        <Card.Description />
                    </Card.Header>
                    <Card.Content>
                        {/* Input Text Area */}
                        <textarea ref={bodyRef} onChange={onChangeBodyHandler}
                            placeholder={`What's on your mind, ${currentUserInfo?.name}`}
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
                            {!isUpdate && <Button onClick={onCancelPostHandler} variant='ghost' className={`${!(postBody || postIamge) ? 'hidden' : ''} flex items-center gap-2 px-5 py-2 rounded-xl text-xs md:text-sm font-bold shadow-sm transition-all active:scale-[0.98]`}>
                                <span>Cancel</span>
                                <X size={14} />
                            </Button>}
                            <Button isDisabled={!isUpdate && (!isValid || !(postBody || postIamge))} isPending={isSubmitting} type="submit" className="flex items-center gap-2  text-white px-5 py-2 rounded-xl text-xs md:text-sm font-bold shadow-sm transition-all active:scale-[0.98]">
                                {({ isPending }) => (
                                    <>
                                        {isPending ? <Spinner color="current" size="sm" /> : null}
                                        {!isUpdate && <span>Post</span> &&  <Send size={14} />}
                                        {isUpdate && <span>Save</span>}
                                        
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
