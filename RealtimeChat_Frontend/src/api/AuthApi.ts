import axios from "axios";
import User from "../types/User";
import {api} from "../constants/BaseUrl";

export const callAuthenticate = async (request: User) => {
    const { data } = await axios({
        method: 'POST',
        url: `${api}/api/auth/token`,
        data: request
    })

    return data
}