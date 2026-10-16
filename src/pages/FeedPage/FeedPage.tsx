import LeftSide from "../../components/feedSides/LeftSide/LeftSide";
import RightSide from "../../components/feedSides/RightSide/RightSide";
import PostForm from "../../components/posts/PostForm/PostForm";
import PostListing from "../../components/posts/PostListing/PostListing";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-light-gray p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4 lg:col-span-3">
          {/* Left Side */}
          <LeftSide />
        </div>
        <div className="md:col-span-4 lg:col-span-6 space-y-4">

          {/* Create Post Form */}
          <PostForm isUpdate={false}/>

          {/* Post Listing */}
          <PostListing isFeed={true} isCurrentUser={false}/>
        </div>
        <div className="md:col-span-4 lg:col-span-3">
          {/* Right Side */}
          <RightSide />
        </div>
      </div>
    </div>
  )
}
