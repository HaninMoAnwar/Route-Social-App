import axios from "axios"
import { baseUrl } from "../sharedLinks/urls"
import type newPasswordData from "../interfaces/newPassword";

export async function getUserPosts(token: string, userId: string) {
    return await axios.request({
        url: `${baseUrl}/users/${userId}/posts`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    );

}
export async function changePassword(token: string, data:newPasswordData) {
    return await axios.request({
        url: `${baseUrl}/users/change-password`,
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        },
        data:data
    }

    );

}