import axios from "axios";
import { api } from "../constants/BaseUrl";
import ChatRoom from "../types/ChatRoom";
import { getToken } from "../services/TokenService";

export const callFindAllByIdUser = async (id: number | string) => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/chat_room/${id}`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data
}

export const callFindAllMessageByIdRoom = async (id: number | string) => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/chat_room/messages/${id}`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data
}

export const callCreateRoom = async (request: ChatRoom) => {
    const { data } = await axios({
        method: 'POST',
        url: `${api}/api/chat_room`,
        data: request,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data
}

export const callSeenAllByIdRoom = async (idRoom: string | number, idUser: string | number) => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/chat_room/seen_all`,
        params: {
            idRoom: idRoom,
            idUser: idUser
        },
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data
}