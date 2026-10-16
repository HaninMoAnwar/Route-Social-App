import axios from "axios"
import { baseUrl } from "../sharedLinks/urls"

export async function getMyProfile(token: string) {
    return await axios.request({
        url: `${baseUrl}/users/profile-data`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    );

}
export async function getUserProfile(token: string, userId: string) {
    return await axios.request({
        url: `${baseUrl}/users/${userId}/profile`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    );

}