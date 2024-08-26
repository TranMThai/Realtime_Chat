import axios from "axios";
import api from "../constants/BaseUrl";

export const callFindAllByIdUser = async (id: number|string) => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/chat_room/${id}`,
    })
    return data
}

export const callFindAllMessageByIdRoom = async (id: number|string) => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/chat_room/messages/${id}`,
    })
    return data
}