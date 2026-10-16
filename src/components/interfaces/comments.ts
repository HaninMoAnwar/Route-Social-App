import type { ApiResponse } from "./ApiResponse"
import type { User } from "./user"

export interface Comment {
  _id: string
  content: string
  commentCreator: User
  post: string
  parentComment: any
  likes: string[]
  createdAt: string
  repliesCount: number
  image?: string
}


export type commentResponse = ApiResponse<Comment[]>