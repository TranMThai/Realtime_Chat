import axios from "axios";
import api from "../constants/BaseUrl";
import ChatRoom from "../types/ChatRoom";

export const callFindAllByIdUser = async (id: number | string) => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/chat_room/${id}`,
    })
    return data
}

export const callFindAllMessageByIdRoom = async (id: number | string) => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/chat_room/messages/${id}`,
    })
    return data
}

export const callCreateRoom = async (request: ChatRoom) => {
    const { data } = await axios({
        method: 'POST',
        url: `${api}/api/chat_room`,
        data: request
    })
    return data
}