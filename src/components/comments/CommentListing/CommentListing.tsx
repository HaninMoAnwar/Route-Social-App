import { useState } from "react";
import type { Post } from "../../interfaces/post"
import CommentCard from "../CommentCard/CommentCard"
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { getPostComments } from "../../services/posts.service";
import type { Comment } from "../../interfaces/comments";
import { Spinner, toast } from "@heroui/react";

type CommentListingProps = {
    post: Post
}

export default function CommentListing({ post }: CommentListingProps) {
    const [isTopComment, setIsTopComment] = useState(true);
    const { userToken } = useAuth();
    const { data, isError, isLoading, error, refetch } = useQuery({
        queryKey: ["allComments", post._id],
        queryFn: () => getPostComments(userToken!, post._id),
        enabled: false,
        select: (data) => data.data
    })

    return (
        <>

            <div className="w-full p-4 md:p-5 flex flex-col">
                {/* Upper Context Header */}
                <span className="text-[11px] font-black text-[#5e7293] uppercase tracking-wider block mb-3 px-1">
                    Top Comment
                </span>

                {data && data?.data.comments.length > 1 ? data.data.comments.map((commentItem: Comment) => <CommentCard postId={post._id} comment={commentItem}  key={commentItem._id}/>) : <CommentCard postId={post._id} comment={post.topComment!} />}
                <div className="px-1">
                    <button onClick={() => { setIsTopComment(false); refetch() }} className={`${!isTopComment ? 'hidden' : ''} text-xs font-extrabold text-brand-blue hover:underline cursor-pointer transition-all`} >
                        View all comments
                    </button>
                </div>
                {isLoading && <Spinner />}
                {isError && toast.danger(error.message)}
            </div>
        </>


    )
}