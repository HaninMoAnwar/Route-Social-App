import axios from "axios"
import { baseUrl } from "../sharedLinks/urls"

export async function getAllPosts(token: string) {
    return await axios.request({
        url: `${baseUrl}/posts`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    );

}
export async function getSinglePosts(token: string, postId: string) {
    return await axios.request({
        url: `${baseUrl}/posts/${postId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    );

}

export async function getPostComments(token: string, postId: string) {
    return await axios.request({
        url: `${baseUrl}/posts/${postId}/comments`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    );

}
export async function createPost(token: string, data: FormData) {
    return await axios.request({
        url: `${baseUrl}/posts/`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: data
    }

    );

}
export async function deletePost(token: string, postId: string) {
    return await axios.request({
        url: `${baseUrl}/posts/${postId}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    );

}
export async function updatePost(token: string, postId: string,data:FormData) {
    return await axios.request({
        url: `${baseUrl}/posts/${postId}`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        data:data
    }

    );

}