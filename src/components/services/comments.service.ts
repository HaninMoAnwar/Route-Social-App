import axios from "axios"
import { baseUrl } from "../sharedLinks/urls"

export async function createComment(token: string, postId: string,data:FormData) {
    return await axios.request({
        url: `${baseUrl}/posts/${postId}/comments`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        data:data
    }

    );

}
export async function deleteComment(token: string, postId: string,commentId:string) {
    return await axios.request({
        url: `${baseUrl}/posts/${postId}/comments/${commentId}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    );

}
export async function updateComment(token: string, postId: string,commentId:string,data:FormData) {
    return await axios.request({
        url: `${baseUrl}/posts/${postId}/comments/${commentId}`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        data:data
    }

    );

}