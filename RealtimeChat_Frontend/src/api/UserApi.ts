import axios from "axios";
import User from "../types/User";
import {api} from "../constants/BaseUrl";
import { getToken } from "../services/TokenService";

export const callFindAllUser = async () => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/users`
    })
    return data
}

export const callCreateUser = async (request: User) => {
    const { data } = await axios({
        method: 'POST',
        url: `${api}/api/users`,
        data: request
    })
    return data
}

export const callFindUserById = async (id: string) => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/users/${id}`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data
}

export const callFindAllUsersWithoutRoomWithIdUser = async (id: string) => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/users/without/${id}`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data
}