import { Avatar, Button, Card, Dropdown, Label, Separator, toast } from '@heroui/react';
import { Globe,  MoreHorizontal, ThumbsUp, MessageSquare, Share2, Repeat2 } from 'lucide-react';
import type { Post } from '../../interfaces/post';
import { Link } from 'react-router-dom';
import CommentListing from '../../comments/CommentListing/CommentListing';
import { useAuth } from '../../contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost} from '../../services/posts.service';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import CommentForm from '../../comments/CommentForm/CommentForm';
import PostForm from '../PostForm/PostForm';

type PostCardProps = {
    post: Post,
    isDetails: boolean
}
export default function PostCard({ post, isDetails }: PostCardProps) {
    const { userId, userToken } = useAuth();
    const [isCreateComment, setIsCreateComment] = useState(false);
    const [isEditPost, setIsEditPost] = useState(false);
    const { mutate: mutate, isSuccess, data, error, status } = useMutation({
        mutationKey: ["deletePost", post._id],
        mutationFn: () => deletePost(userToken!, post._id)
    })
   
    const queryClient = useQueryClient();
    if (status === "success") {
        queryClient.invalidateQueries({ queryKey: ["allPosts"] })
    }

    function postCreationDate() {
        const created = new Date(post.createdAt);
        const now = new Date();

        // Calculate the difference in milliseconds and convert to seconds
        const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000);

        // Fallback for future dates or clock mismatch
        if (diffInSeconds < 0) return '0s';

        // Less than 60 seconds
        if (diffInSeconds < 60) {
            return `${diffInSeconds}s`;
        }

        // Less than 60 minutes
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes}m`;
        }

        // Less than 24 hours
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours}h`;
        }

        // Days
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d`;
    }
    useEffect(() => {
        if (isEditPost) {

        }
    }, [isEditPost])

    return (
        <>
            {!isEditPost &&
                <Card className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex">
                    <Card.Header className="mb-4">
                        <Card.Title className="flex items-center gap-3 justify-between">
                            <div className="flex items-center gap-3">
                                <Link to={`/profile/${post.user._id}`}>
                                    <Avatar>
                                        <Avatar.Image src={post.user.photo}
                                            className="rounded-full border border-slate-200" />
                                    </Avatar>
                                </Link>

                                <div>
                                    <Link to={`/profile/${post.user._id}`} className="flex items-center gap-1.5">
                                        <h4 className="text-sm font-bold text-brand-dark-blue leading-tight">{post.user.name}</h4>
                                    </Link>

                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-0.5">

                                        <span>@{post.user.username}</span>

                                        <span>•</span>
                                        <span>{postCreationDate()}</span>
                                        <span>•</span>
                                        <div className="flex items-center gap-1 transition-colors">
                                            <Globe size={12} />
                                            <span>{post.privacy}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {userId === post.user._id ? <Dropdown>
                                <Dropdown.Trigger>

                                    <Button variant='ghost' className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-all bg-none">
                                        <MoreHorizontal size={20} />
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Popover>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setIsEditPost(true)}>
                                            <Label>Edit Post</Label>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Label>Save Post</Label>
                                        </Dropdown.Item>
                                        <Separator />
                                        <Dropdown.Item onAction={mutate}>
                                            <Label className='text-red-600'>Delete Post</Label>
                                        </Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown> : ''}

                        </Card.Title>

                    </Card.Header >
                    <Card.Content>
                        {/* Post Text Content Body */}
                        {post.body && <div className="text-sm text-slate-800 font-medium leading-relaxed mb-6 px-1 wrap-break-word">
                            {post.body}
                        </div>}
                        {post.image && <div className="text-sm text-slate-800 font-medium leading-relaxed mb-6 px-1 m-auto">
                            <img src={post.image} alt="" />
                        </div>}
                    </Card.Content>
                    <Card.Footer className='block'>
                        {/* Metrics Counter Section */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-1 text-xs text-slate-500 font-semibold px-1">
                            {/* Likes Count Indicator */}
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-brand-blue rounded-full flex items-center justify-center shadow-xs">
                                    <ThumbsUp size={11} className="text-white fill-white" />
                                </div>
                                <span>{post.likesCount} likes</span>
                            </div>

                            {/* Shares & Comments Links */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Repeat2 size={14} className="text-slate-400" />
                                    <span>{post.sharesCount} shares</span>
                                </div>
                                <span>{post.commentsCount} comments</span>
                                {!isDetails && <Link to={`/posts/${post._id}`} className="text-brand-bbg-brand-blue font-bold hover:underline transition-all">
                                    View details
                                </Link>}
                            </div>
                        </div>

                        {/* Interactive Action Response Toolbar */}
                        <div className="grid grid-cols-3 pt-1.5 text-slate-600 text-sm font-bold">
                            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all group">
                                <ThumbsUp size={18} className="text-slate-500 group-hover:scale-105 transition-transform" />
                                <span>Like</span>
                            </button>

                            <button onClick={() => setIsCreateComment(!isCreateComment)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all group">
                                <MessageSquare size={18} className="text-slate-500 group-hover:scale-105 transition-transform" />
                                <span>Comment</span>
                            </button>

                            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all group">
                                <Share2 size={18} className="text-slate-500 group-hover:scale-105 transition-transform" />
                                <span>Share</span>
                            </button>
                        </div>

                        {isCreateComment && <CommentForm postId={post._id} isUpdate={false}/>}
                        {post.topComment && <CommentListing post={post} />}
                    </Card.Footer>


                </Card >}
            {isEditPost && <PostForm isUpdate={isEditPost} setIsUpdate={setIsEditPost} post={post} />}
            {data && isSuccess && toast.success(data.data.message)}
            {isAxiosError(error) ? toast.danger(error.response?.data.message) : ''}

        </>

    );
}
