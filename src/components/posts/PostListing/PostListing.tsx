import { useAuth } from '../../contexts/AuthContext';
import { getAllPosts } from '../../services/posts.service';
import PostCard from '../PostCard/PostCard';
import type { Post } from '../../interfaces/post';
import { Spinner, toast } from '@heroui/react';
import { isAxiosError } from 'axios';
import { getUserPosts } from '../../services/user.service';
import { useQuery } from '@tanstack/react-query';

interface PostListingProps {
  isFeed: boolean;
  isCurrentUser:boolean;
  userId?:string
}
export default function PostListing({ isFeed,isCurrentUser,userId }: PostListingProps) {

  const { userToken, userId : currentUserId} = useAuth();
  let queryFn, queryKey: string[];
  if (isFeed) {
    queryFn = () => getAllPosts(userToken!);
    queryKey = ["allPosts"]

  }
  else if(isCurrentUser) {
    queryFn = () => getUserPosts(userToken!, currentUserId!);
    queryKey = ["allPosts", currentUserId!];
  }
  else{
    
    queryFn = () => getUserPosts(userToken!, userId!);
    queryKey = ["allPosts", userId!];
  }
 

  const { data, error, isError, isLoading } = useQuery({
    queryFn: queryFn,
    queryKey: queryKey,
    select: (data) => data.data
  })
  return (
    <>
      {isLoading && <div className="fixed inset-0 bg-light-gray/80 backdrop-blur-xs flex flex-col items-center justify-center z-9999 pointer-events-auto select-none">
        <Spinner />
      </div>
      }

      <main className="w-full flex flex-col space-y-6">
        {isAxiosError(error) && isError && toast.danger(error.message)}

        {/* Post Cards */}
        {data ? data.data.posts.map((postItem: Post) => <PostCard post={postItem} isDetails={false} key={postItem._id} />) : <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-slate-500 max-w-sm leading-relaxed">
            No posts yet. Be the first one to publish.
          </p>
        </div>}

      </main>
    </>
  );
}
