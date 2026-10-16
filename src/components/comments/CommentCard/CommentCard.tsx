import { Avatar, Button, Card, Dropdown, Label, toast } from '@heroui/react'; // Free component
import type { Comment } from '../../interfaces/comments';
import { MoreHorizontal } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../../services/comments.service';
import { isAxiosError } from 'axios';
import { Link } from 'react-router-dom';
import CommentForm from '../CommentForm/CommentForm';
import { useState } from 'react';

type CommentCardProps = {

    comment: Comment,
    postId: string
}
export default function CommentCard({ comment, postId }: CommentCardProps) {
    const { userId, userToken } = useAuth();
    const [isEditComment, setIsEditComment] = useState(false);
    const { mutate, isSuccess, data, error, status } = useMutation({
        mutationKey: ["deleteComment", comment._id],
        mutationFn: () => deleteComment(userToken!, postId, comment._id)
    })
    const queryClient = useQueryClient();
    if (status === "success") {
        queryClient.invalidateQueries({ queryKey: ["allPosts"] })
        queryClient.invalidateQueries({ queryKey: ["singlePost"] })
        queryClient.invalidateQueries({ queryKey: ["allComments",postId] })
    }

    return (
        <>
            {!isEditComment &&
                <Card className='mt-5'>
                    <Card.Content className="flex flex-row items-start gap-3 mb-3">
                        <Link to={`/profile/${comment.commentCreator._id}`} >
                            <Avatar>
                                <Avatar.Image
                                    src={comment.commentCreator.photo}
                                    className="rounded-full border border-slate-200 mt-0.5 shrink-0"
                                />
                            </Avatar>
                        </Link>

                        {/* Comment Text Context Bubble */}
                        <div className="flex-1 bg-white border border-slate-50 rounded-2xl px-4 py-3 shadow-xs">
                            <h5 className="text-xs font-black text-brand-dark-blue tracking-tight leading-tight">
                                {comment.commentCreator.name}
                            </h5>
                            <p className="text-sm font-medium text-slate-600 mt-1 leading-normal">
                                {comment.content}
                            </p>
                            {comment.image && <img src={comment.image} alt="comment image" className="rounded-2xl" />}
                        </div>

                        {userId === comment.commentCreator._id ? <Dropdown>
                            <Dropdown.Trigger>

                                <Button variant='ghost' className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-all bg-none">
                                    <MoreHorizontal size={20} />
                                </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Popover>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setIsEditComment(true)}>
                                        <Label>Edit</Label>
                                    </Dropdown.Item>
                                    <Dropdown.Item onAction={mutate}>
                                        <Label className='text-red-600'>Delete</Label>
                                    </Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown> : ''}
                    </Card.Content>

                </Card>
            }
            {isEditComment &&
                <CommentForm postId={postId} isUpdate={isEditComment} setIsUpdate={setIsEditComment} comment={comment} />}
            {data && isSuccess && toast.success(data.data.message)}
            {isAxiosError(error) ? toast.danger(error.response?.data.message) : ''}

        </>

    );
}
