import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getSinglePosts } from "../../components/services/posts.service"
import { useAuth } from "../../components/contexts/AuthContext";
import { Spinner, toast } from "@heroui/react";
import PostCard from "../../components/posts/PostCard/PostCard";

export default function PostDetailsPage() {
  const { postId } = useParams();
  const { userToken } = useAuth();
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["singlePost", postId],
    queryFn: () => getSinglePosts(userToken!, postId!),
    select: (data) => data.data
  })

  return (
    <>
      {isLoading && <div className="fixed inset-0 bg-light-gray/80 backdrop-blur-xs flex flex-col items-center justify-center z-9999 pointer-events-auto select-none">
        <Spinner />
      </div>
      }
      {isError && toast.danger(error.message)}
      {data && <PostCard post={data?.data.post} isDetails={true}/>}


    </>
  )
}
