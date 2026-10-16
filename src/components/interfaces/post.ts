import type { ApiResponse } from "./ApiResponse"
import type { Comment } from "./comments"
import type { User } from "./user"

export interface Post {
  _id: string
  body?: string
  image?: string
  privacy: string
  user: User
  sharedPost?: SharedPost
  likes: string[]
  createdAt: string
  commentsCount: number
  topComment?: Comment
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
  bookmarked: boolean
}

export interface SharedPost {
  _id: string
  body: string
  image: string
  privacy: string
  user: User
  sharedPost: any
  likes: string[]
  createdAt: string
  commentsCount: number
  topComment: Comment
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
}

export type PostResponse = ApiResponse<Post[]>;

